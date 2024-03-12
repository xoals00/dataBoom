import requests
import pandas as pd
import pymysql
import random
from tqdm import tqdm
import time
import math
import sys
import json

data = sys.argv[1:]
tier = "BRONZE"

api_key = 'RGAPI-36ff1947-075a-4441-9e90-df81d5d1cd03'
num = 3


def connect_mysql(db='mydb'):
    conn = pymysql.connect(host='svc.sel4.cloudtype.app', port=32509,
                        user='root', password='1234',
                        db=db, charset='utf8')
    return conn


def sql_execute(conn, query):
    cursor = conn.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    return result


def get_puuid(nickname, tag):
    url = f'https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{nickname}/{tag}?api_key={api_key}'
    res = requests.get(url).json()
    puuid = res['puuid']
    return puuid


def get_match_id(puuid,num):
    url = f'https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?type=ranked&start=0&count={num}&api_key={api_key}'
    match_list = requests.get(url).json()
    return match_list
#rabjed 솔로,자유 포함 ,queue로 하면 원하는 랭크 뽑을 수 있음

def get_matches_timelines(matchid):
    url1 = f'https://asia.api.riotgames.com/lol/match/v5/matches/{matchid}?api_key={api_key}'
    url2 = f'https://asia.api.riotgames.com/lol/match/v5/matches/{matchid}/timeline?api_key={api_key}'
    matches = requests.get(url1).json()
    timelines = requests.get(url2).json()
    return matches, timelines

def get_rawdata(tier):
    division_list = ['I','II','III','IV']
    lst = []
    page = random.randrange(1,20)
 
    
    for division in tqdm(division_list):
        url = f'https://kr.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/{tier}/{division}?page={page}&api_key={api_key}'
        res = requests.get(url).json()
        lst += random.sample(res,3)
    # lst라는 변수에서 summonerId만 리스트에 담기
    summoner_id_list = list(map(lambda x:x['summonerId'] ,lst))
    # summonerId가 담긴 리스트를 통해 puuId
  
    puu_id_list = []
    for summoner_id in tqdm(summoner_id_list):
        url = f'https://kr.api.riotgames.com/lol/summoner/v4/summoners/{summoner_id}?api_key={api_key}'
        res = requests.get(url).json()
        puu_id = res['puuid']
        puu_id_list.append(puu_id)
    

    match_id_list = []
    #puuId를 통해 matchId를 가져오기 -> 3개씩 담기
    for puu_id in tqdm(puu_id_list):
        match_ids = get_match_id(puu_id,3)
        match_id_list.extend(match_ids)
  
    df_create = []
    for match_id in tqdm(match_id_list):
        matches,timelines = get_matches_timelines(match_id)
        df_create.append([match_id,matches,timelines])
    #matches,timeline을 불러서 이중리스트를 만들고 데이터프레임으로 만들어서 - [match_id,matches,timelines]
    df =pd.DataFrame(df_create,columns = ['match_id','matches','timelines'])
    return df


def get_match_timeline_df(df,tier):
    # df를 한개로 만들기
    dfs_creates = []
    

    for i in tqdm(range(len(df))):       
        # matches 관련된 데이터 
        
        try:
            if int(df.iloc[i].matches['info']['gameDuration']/60) >= 20 :    
                for j in range(len(df.iloc[i].matches['info']['participants'])):
                    tmp = []
                    tmp.append(df.iloc[i].match_id)
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['championName'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['teamId']) #100:블루 200:레드

                    tmp.append(df.iloc[i].matches['info']['participants'][j]['kills'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['assists'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['deaths'])

                    if(df.iloc[i].matches['info']['participants'][j]['deaths'] == 0):
                        kda = df.iloc[i].matches['info']['participants'][j]['kills'] + df.iloc[i].matches['info']['participants'][j]['assists']
                    else :
                        kda = (df.iloc[i].matches['info']['participants'][j]['kills'] + df.iloc[i].matches['info']['participants'][j]['assists'] )/ df.iloc[i].matches['info']['participants'][j]['deaths']    
                    tmp.append(kda)

                    tmp.append(df.iloc[i].matches['info']['participants'][j]['totalTimeSpentDead'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['visionWardsBoughtInGame'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['visionScore'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['win'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['riotIdGameName']) #게임아이디
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['riotIdTagline']) #태그
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['goldEarned']) #총 골드량
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['totalDamageDealtToChampions']) # 챔피언에게 가한 피해량
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['totalMinionsKilled']) #전체 미니언킬
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['wardsPlaced']) #와드 설치수
              

                    tmp.append(df.iloc[i].matches['info']['participants'][j]['championId']) #챔피언아이디
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['participantId'])#경기자번호
                    tmp.append(df.iloc[i].matches['info']['queueId']) #큐아이디
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['teamPosition'])#라인
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['totalDamageTaken']) #총 맞은 데미지
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['totalTimeCCDealt']) #총 cc기에 걸려있던 시간
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['onMyWayPings'])
                    tmp.append(df.iloc[i].matches['info']['participants'][j]['enemyVisionPings'])
                    tmp.append(tier)
                    tmp.append(int(df.iloc[i].matches['info']['gameDuration']/60))
                    
                    
                    dfs_creates.append(tmp)
        except Exception as e:

            continue

    columns = ['matchId','championName', 'teamId', 'kills', 'assists', 'deaths', 'kda','totalTimeSpentDead','visionWardsBoughtInGame','visionScore','win'
            ,'riotIdGameName','riotIdTagline','goldEarned','totalDamageDealtToChampions'
            ,'totalMinionsKilled','wardsPlaced','championId','participantId','queueId','teamPosition','totalDamageTaken'
            ,'totalTimeCCDealt','onMyWayPings','enemyVisionPings','tier','gameDuration']
    df = pd.DataFrame(dfs_creates, columns=columns)
    
    return df


def insert_matches_timeline_mysql(row, conn):

    query = (
        f"INSERT ignore INTO riottvT (matchId,championName, teamId, kills, assists,deaths,kda,totalTimeSpentDead,visionWardsBoughtInGame,visionScore,win"
        f",riotIdGameName,riotIdTagline,goldEarned,totalDamageDealtToChampions"
        f",totalMinionsKilled,wardsPlaced,championId,participantId,queueId,teamPosition,totalDamageTaken"
        f",totalTimeCCDealt,onMyWayPings,enemyVisionPings,tier,gameDuration"
        f")"
        f"VALUES (\'{row.matchId}\',\'{row.championName}\',\'{row.teamId}\',\'{row.kills}\', \'{row.assists}\', \'{row.deaths}\', \'{row.kda}\' "
        f", \'{row.totalTimeSpentDead}\', \'{row.visionWardsBoughtInGame}\',\'{row.visionScore}\',\'{row.win}\' ,\'{row.riotIdGameName}\'"
        f", \'{row.riotIdTagline}\', \'{row.goldEarned}\',\'{row.totalDamageDealtToChampions}\',\'{row.totalMinionsKilled}\',\'{row.wardsPlaced}\'"
        f", \'{row.championId}\',\'{row.participantId}\',\'{row.queueId}\',\'{row.teamPosition}\' ,\'{row.totalDamageTaken}\' "  
        f", \'{row.totalTimeCCDealt}\', \'{row.onMyWayPings}\',\'{row.enemyVisionPings}\',\'{row.tier}\',\'{row.gameDuration}\'"  
        f") "  
    )

    sql_execute(conn, query)

def sql_execute(conn, query):
    try:
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
    except Exception as e:
        print(e)
        conn.rollback()
    finally:
        cursor.close()

raw_data = get_rawdata(tier)
df = get_match_timeline_df(raw_data,tier)
conn = connect_mysql()
# 데이터 넣기
df.apply(lambda x: insert_matches_timeline_mysql(x, conn), axis=1)

# commit을 통해 데이터 삽입을 완료한 후에 update 실행
conn.commit()
conn.close()
data = {"result":"성공"}
json_string = json.dumps(data)

print(json_string)
