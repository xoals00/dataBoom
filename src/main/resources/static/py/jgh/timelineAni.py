import requests
import pandas as pd
import pymysql
import random
from tqdm import tqdm
import time
import math
import sys
import json
import datetime

data = sys.argv[1:]
api_key = 'RGAPI-36ff1947-075a-4441-9e90-df81d5d1cd03'
matchId = data[0] 
# matchId = "KR_6973595010"
# print(data)

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

def get_matches_timelines(matchid,api_key):
    url2 = f'https://asia.api.riotgames.com/lol/match/v5/matches/{matchid}/timeline?api_key={api_key}'
    timelines = requests.get(url2).json()
    return timelines

def insert_matches_timeline_mysql(row, conn):
    if row.participantId == 0:
        championName = 'minion'
        champion_name_kr = '미니언'
        query = (
            f"INSERT ignore INTO aiTimelineT"
            f" VALUES (\'{row.matchId}\','{championName}','{champion_name_kr}',300"
            f",(select championName from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.victim}\')"
            f",(select champion_name_kr from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.victim}\')"
            f",(select teamId from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.victim}\')"
            f",\'{row.x}\', \'{row.y}\', \'{row.now_time}\',  \'{row.timestamp}\'"
            f",(select queueId from RiotGameInfoT where matchId = \'{row.matchId}\' limit 1),0,\'{row.minPerGold}\'"
            f")"
        )
    else :
        query = (
            f"INSERT ignore INTO aiTimelineT"
            f" VALUES (\'{row.matchId}\',(select championName from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.participantId}\')"
            f",(select champion_name_kr from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.participantId}\')"
            f",(select teamId from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.participantId}\')"
            f",(select championName from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.victim}\')"
            f",(select champion_name_kr from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.victim}\')"
            f",(select teamId from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.victim}\')"
            f",\'{row.x}\', \'{row.y}\', \'{row.now_time}\',  \'{row.timestamp}\'"
            f",(select queueId from RiotGameInfoT where matchId = \'{row.matchId}\' limit 1),\'{row.killStreakLength}\',\'{row.minPerGold}\'"
            f")"
        )
        
    sql_execute(conn, query)

    
def insert_matches_monster_timeline_mysql(row, conn):
    if row.participantId == 0:
        championName = 'minion'
        champion_name_kr = '미니언'
        query = (
            f"INSERT ignore INTO aiTimelineT"
            f" VALUES (\'{row.matchId}\','{championName}','{champion_name_kr}',300,\'{row.victim_championName}\',\'{row.victim}\',300"
            f",\'{row.x}\', \'{row.y}\', \'{row.now_time}\',  \'{row.timestamp}\'"
            f",(select queueId from RiotGameInfoT where matchId = \'{row.matchId}\' limit 1),\'{row.killStreakLength}\',\'{row.minPerGold}\'"
            f")"
        )        
    else :     
        query = (
            f"INSERT ignore INTO aiTimelineT"
            f" VALUES (\'{row.matchId}\'"
            f",(select championName from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.participantId}\')"
            f",(select champion_name_kr from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.participantId}\')"
            f",(select teamId from RiotGameInfoT where matchId = \'{row.matchId}\' and participantId = \'{row.participantId}\')"
            f",\'{row.victim_championName}\',\'{row.victim}\',300"          
            f",\'{row.x}\', \'{row.y}\', \'{row.now_time}\',  \'{row.timestamp}\'"
            f",(select queueId from RiotGameInfoT where matchId = \'{row.matchId}\' limit 1),\'{row.killStreakLength}\',\'{row.minPerGold}\'"
            f")"
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




timelines = get_matches_timelines(matchId,api_key)

mytime_Gamer_list = []
mytime_monster_list = []
memo_list = []
participantFrames_List = []

allxGold = ''
allyGold = ''
timlines_list = timelines['info']['frames']
now_gold = 0
minPerGold = ''
teamId = 0
def minPerGoldCheck(i):

    xGold = 0 # 1~5
    yGold = 0 # 6~10
    participantFrameslist = timlines_list[i]['participantFrames']

    teamPositionX = timlines_list[0]['participantFrames']['1']['position']['x']
    if teamPositionX > 5000:
        teamId = 200 #1~5 이 레드



    else :
        teamId = 100 #1~5 이 블루



    for h in range(len(participantFrameslist)) :
        h = h + 1
        if h <= 5 :
            h = f'{h}'
            now_gold = participantFrameslist[h]['totalGold']
            xGold += xGold + now_gold
        
        else :
            h = f'{h}'
            now_gold = participantFrameslist[h]['totalGold']
            yGold += yGold + now_gold
        
        
        tGold = xGold+yGold    
    if teamId == 100 : 
        minPerGold = str(int(xGold / tGold * 100)) + ":"+str(100-int(xGold / tGold * 100))
    else : 
        minPerGold = str(100-int(xGold / tGold * 100))+ ":" + str(int(xGold / tGold * 100))
    return minPerGold

for i in range(len(timlines_list)): #경기중 i분

    events_list = timlines_list[i]['events']
    for j in range(len(events_list)): #i분중의 j번째의 이벤트

        if events_list[j]['type'] == "CHAMPION_KILL":
            mynow_dict = []
            killer = events_list[j]['killerId']
            victim = events_list[j]['victimId']
            x = events_list[j]['position']['x']
            y = events_list[j]['position']['y']

            timestamp = events_list[j]['timestamp']
            now_min = int(timestamp / 1000/60)
            seconds = (timestamp / 1000/60)
            a = seconds - now_min
            now_second = int(60 * a)

            if  now_second < 10 : # 10보다 작은수
                now_second= '0' + str(now_second)

            

            mynow_dict.append(matchId)    
            participantId = killer
            mynow_dict.append(participantId)
            mynow_dict.append(victim) 
            mynow_dict.append(round(x/15000,2))
            mynow_dict.append(round(y/15000,2)) 
            mynow_dict.append(str(now_min) + ':' + str(now_second)) 
            mynow_dict.append(timestamp) 
            mynow_dict.append(events_list[j]['killStreakLength']) 

            mynow_dict.append(minPerGoldCheck(now_min+1)) 
  
            mytime_Gamer_list.append(mynow_dict)

        elif events_list[j]['type'] == "ELITE_MONSTER_KILL": #D
            mynow_dict = []
            monsterSubType = ''
            monsterType = events_list[j]['monsterType']
            if monsterType == "DRAGON" :
                if events_list[j]['monsterSubType'] == "CHEMTECH_DRAGON":
                    victim_championName= "CHEMTECH_DRAGON"
                    monsterSubType = "화학공학 D"
                    killStreakLength = 101
                elif events_list[j]['monsterSubType'] == "FIRE_DRAGON":
                    victim_championName= "FIRE_DRAGON"
                    killStreakLength = 102
                    monsterSubType = "화염 D"   
                elif events_list[j]['monsterSubType'] == "AIR_DRAGON":
                    victim_championName= "AIR_DRAGON"
                    monsterSubType = "바람 D"
                    killStreakLength = 103
                elif events_list[j]['monsterSubType'] == "HEXTECH_DRAGON":
                    victim_championName= "HEXTECH_DRAGON"
                    monsterSubType = "마법공학 D"
                    killStreakLength = 104
                elif events_list[j]['monsterSubType'] == "EARTH_DRAGON":
                    victim_championName= "EARTH_DRAGON"
                    monsterSubType = "대지 D"
                    killStreakLength = 105
                elif events_list[j]['monsterSubType'] == "WATER_DRAGON":
                    victim_championName= "WATER_DRAGON"
                    monsterSubType = "바다 D"
                    killStreakLength = 106
                elif events_list[j]['monsterSubType'] == "ELDER_DRAGON": 
                    victim_championName= "ELDER_DRAGON"                        
                    monsterSubType = "장로 D"
                    killStreakLength = 107
            if events_list[j]['monsterType'] == "HORDE": 
                victim_championName= "HORDE"                        
                monsterSubType = "공허 유충"  
                killStreakLength = 108
            elif events_list[j]['monsterType'] == "RIFTHERALD": 
                victim_championName= "RIFTHERALD"                        
                monsterSubType = "협곡의 전령"  
                killStreakLength = 109
            elif events_list[j]['monsterType'] == "BARON_NASHOR": 
                victim_championName= "BARON_NASHOR"                        
                monsterSubType = "내셔남작(바론)"    
                killStreakLength = 110                                      

            killer = events_list[j]['killerId']
            
            x = events_list[j]['position']['x']
            y = events_list[j]['position']['y']

            timestamp = events_list[j]['timestamp']
            now_min = int(timestamp / 1000/60)
            seconds = (timestamp / 1000/60)
            
            a = seconds - now_min
            now_second = int(60 * a)

            if  now_second < 10 : # 10보다 작은수
                now_second= '0' + str(now_second)

            mynow_dict.append(matchId) 
            participantId = killer
            mynow_dict.append(participantId) 
            mynow_dict.append(monsterSubType)
            mynow_dict.append(victim_championName)  
            mynow_dict.append(round(x/15000,2)) 
            mynow_dict.append(round(y/15000,2))
            mynow_dict.append(str(now_min) + ':' + str(now_second))
            mynow_dict.append(timestamp) 
            mynow_dict.append(killStreakLength) 
            mynow_dict.append(minPerGoldCheck(now_min+1))  

            mytime_monster_list.append(mynow_dict)
  



df =pd.DataFrame(mytime_Gamer_list,columns = ['matchId','participantId','victim','x','y','now_time','timestamp','killStreakLength','minPerGold'])  
df_monster =pd.DataFrame(mytime_monster_list,columns = ['matchId','participantId','victim','victim_championName','x','y','now_time','timestamp','killStreakLength','minPerGold'])



conn = connect_mysql()
# 데이터 넣기
if len(df) != 0:
    df.apply(lambda x: insert_matches_timeline_mysql(x, conn), axis=1)
if len(df_monster) != 0:
    df_monster.apply(lambda x: insert_matches_monster_timeline_mysql(x, conn), axis=1)
# # commit을 통해 데이터 삽입을 완료한 후에 update 실행
conn.commit()
conn.close()
data = {"result":"저장성공"}
json_string = json.dumps(data)

print(json_string)