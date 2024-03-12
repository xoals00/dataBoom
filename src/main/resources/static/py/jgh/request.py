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
nickname ='동정팔이소년'
tag = 'KR1'

num = 10 #matchId갯수
api_key = 'RGAPI-e674eb69-7d34-41d9-adfb-e43ad16950ca'




matchesInfo = []

for i in matches:
       
    matchId = i['metadata']['matchId']
    queueId = i['info']['queueId']
    gameEndTimestamp  = i['info']['gameEndTimestamp']
    gameStartTimestamp = i['info']['gameStartTimestamp']    

    for j in i['info']['participants']:
        championName = j['championName']
        riotIdGameName =j['riotIdGameName']
        riotIdTagline = j['riotIdTagline']
        summonerName = j['summonerName']
        summonerLevel = j['summonerLevel']
        profileIcon = j['profileIcon']
        participantId = j['participantId']
        teamId = j['teamId']
        item0 =j['item0']
        item1=j['item1']
        item2=j['item2']
        item3=j['item3']
        item4=j['item4']
        item5=j['item5']
        summoner1Id = j['summoner1Id']
        summoner2Id = j['summoner2Id']
      

        lane = j['lane']
        kills = j['kills']
        assists = j['assists']
        deaths = j['deaths']
        kda = (kills + assists)/deaths

        firstBloodKill = j['firstBloodKill']
        totalAllyJungleMinionsKilled = j['totalAllyJungleMinionsKilled']
        totalDamageDealtToChampions = j['totalDamageDealtToChampions']

        totalDamageTaken = j['totalDamageTaken']
        totalEnemyJungleMinionsKilled = j['totalEnemyJungleMinionsKilled']
        totalMinionsKilled = j['totalMinionsKilled']
        wardsKilled = j['wardsKilled']
        wardsPlaced = j['wardsPlaced']
        win = j['win']
        goldEarned = j['goldEarned']
        puuid = j['puuid']
        totalTimeSpentDead = j['totalTimeSpentDead']

        visionScore = j['visionScore']
        visionWardsBoughtInGame = j['visionWardsBoughtInGame']
 

        bin = {}
        bin['matchId'] = matchId
        bin['championName'] = championName

        bin['riotIdGameName'] = riotIdGameName
        bin['riotIdTagline'] = riotIdTagline
        bin['summonerName'] = summonerName
        bin['summonerLevel'] = summonerLevel
        bin['profileIcon'] = profileIcon
        bin['participantId'] = participantId
        bin['queueId'] = queueId
        bin['teamId'] = teamId
        bin['item0'] = item0
        bin['item1'] = item1
        bin['item2'] = item2
        bin['item3'] = item3
        bin['item4'] = item4
        bin['item5'] = item5

        bin['summoner1Id'] = summoner1Id
        bin['summoner2Id'] = summoner2Id
  

        bin['lane'] = lane
        bin['kills'] = kills
        bin['assists'] = assists
        bin['deaths'] = deaths
        bin['kda'] = kda
        bin['firstBloodKill'] = firstBloodKill
        bin['gameEndTimestamp'] = gameEndTimestamp
        bin['gameStartTimestamp'] = gameStartTimestamp
        bin['totalAllyJungleMinionsKilled'] = totalAllyJungleMinionsKilled
        bin['totalDamageDealtToChampions'] = totalDamageDealtToChampions
        bin['totalDamageTaken'] = totalDamageTaken
        bin['totalEnemyJungleMinionsKilled'] = totalEnemyJungleMinionsKilled
        bin['totalMinionsKilled'] = totalMinionsKilled
        bin['wardsKilled'] = wardsKilled
        bin['wardsPlaced'] = wardsPlaced
        bin['win'] = win
        bin['goldEarned'] = goldEarned
        bin['puuid'] = puuid
        bin['totalTimeSpentDead'] = totalTimeSpentDead
        bin['visionScore'] = visionScore
        bin['visionWardsBoughtInGame'] = visionWardsBoughtInGame


        matchesInfo.append(bin)

# mysql 사용자지정
def connect_mysql(db='mydb'):
    conn = pymysql.connect(host='svc.sel4.cloudtype.app', port=32509,
                        user='root', password='1234',
                        db=db, charset='utf8')
    return conn


conn = connect_mysql()

#쿼리 실행시구문
def sql_execute(conn, query):
    cursor = conn.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
    return result

# data = {"result":matchesInfo}
# json_string = json.dumps(data)

# print(json_string)



def insert_mysql(matchesInfo , conn):
    cursor = conn.cursor()
    # lambda를 이용해서 progress_apply를 통해 insert할 구문 만들기
   
    query = """
            insert into RiotGameInfoT(matchId, championName, champion_name_kr, riotIdGameName, riotIdTagline, summonerName,
            summonerLevel, profileIcon, participantId,queueId,teamId,item0,item1,item2,item3,item4,item5,summoner1Id,
            summoner2Id,summonerSpellD,summonerSpellF,lane,kills,assists,deaths,kda,firstBloodKill,gameEndTimestamp,gameStartTimestamp,
            totalAllyJungleMinionsKilled,totalDamageDealtToChampions,totalDamageTaken,totalEnemyJungleMinionsKilled,totalMinionsKilled,
            wardsKilled,wardsPlaced,win,goldEarned,puuid,totalTimeSpentDead,visionScore,visionWardsBoughtInGame)

            values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """
    query1 ='select champion_name_kr from champListT where champion_name = %s'
    query2 = 'select spellName from RiotGameSpellT where summonerId =%s'
    query3 = 'select spellName from RiotGameSpellT where summonerId =%s'

    cursor.execute(query1, matchesInfo['championName'])
    a = cursor.fetchall()
    cursor.execute(query2, matchesInfo['summoner1Id'])
    b = cursor.fetchall()
    cursor.execute(query3, matchesInfo['summoner2Id'])
    c = cursor.fetchall()
    
    cursor.execute(query,(matchesInfo['matchId'],matchesInfo['championName'],a,matchesInfo['riotIdGameName'],matchesInfo['riotIdTagline'],matchesInfo['summonerName']
                   ,matchesInfo['summonerLevel'],matchesInfo['profileIcon'],matchesInfo['participantId'],matchesInfo['queueId'],matchesInfo['teamId'],matchesInfo['item0'],matchesInfo['item1']
                   ,matchesInfo['item2'],matchesInfo['item3'],matchesInfo['item4'],matchesInfo['item5'],matchesInfo['summoner1Id'],matchesInfo['summoner2Id']
                   ,b,c,matchesInfo['lane'],matchesInfo['kills'],matchesInfo['assists'],matchesInfo['deaths'],matchesInfo['kda']
                   ,matchesInfo['firstBloodKill'],matchesInfo['gameEndTimestamp'],matchesInfo['gameStartTimestamp'],matchesInfo['totalAllyJungleMinionsKilled'],matchesInfo['totalDamageDealtToChampions']
                   ,matchesInfo['totalDamageTaken'],matchesInfo['totalEnemyJungleMinionsKilled'],matchesInfo['totalMinionsKilled'],matchesInfo['wardsKilled']
                   ,matchesInfo['wardsPlaced'],matchesInfo['win'],matchesInfo['goldEarned'],matchesInfo['puuid'],matchesInfo['totalTimeSpentDead']
                   ,matchesInfo['visionScore'],matchesInfo['visionWardsBoughtInGame']))
# matchesInfo['summonerSpellD']matchesInfo['summonerSpellF']matchesInfo['champion_name_kr']

try :
    for matchdata in matchesInfo:
        insert_mysql(matchdata, conn)
except Exception as e:
        print(f'{e}의 원인으로 insert실패')

conn.commit()
conn.close()

# print(a)
# print(trans[kn.predict([[cs,ward]])[0]])
data111 = {"result":"성공"}
json_string = json.dumps(data111)

print(json_string)



