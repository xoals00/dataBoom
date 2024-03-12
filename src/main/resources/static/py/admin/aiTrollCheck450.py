#-*- coding:utf-8 -*-
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import minmax_scale
import requests
import pymysql
import random
from tqdm import tqdm
import time
import math


#########################
def connect_mysql(db='mydb'):
    conn = pymysql.connect(host='svc.sel4.cloudtype.app', port=32509,
                        user='root', password='1234',
                        db=db, charset='utf8')
    return conn
conn = connect_mysql()
cursor = conn.cursor()
queueId = str(450) #큐아이디
limit_value = str(100) # 리미트값
############################

data = sys.argv[1:]

# print(data)

key = data[0]
gameDuration = int(data[1])
kda = float(data[2])
totalDamageDealtToChampions = int(int(data[3])/gameDuration) 
goldEarned = int(int(data[4])/gameDuration)
championName = data[5]
# print(championName)
# print(gameDuration)
# key= '123'
# tier = 'GOLD'
# kda = 10
# totalDamageDealtToChampions = 1500
# goldEarned = 600
# teamPosition = 'TOP'
# championName = 'Rumble' #캐릭터
tier_my = [totalDamageDealtToChampions,goldEarned]
#졌을때 평균 구하기######################################################################################################################################

query = "select win,gameDuration,kda,totalDamageDealtToChampions,goldEarned from riottvT where championName = '" +championName+ "' and queueId = '" +queueId+ "' limit " + limit_value #질때의 kda
cursor.execute(query)
result = cursor.fetchall()
data = list(result)

lose_gameDuration_List = []
lose_kda_List = []
lose_Mean_totalDamageDealtToChampions = []
lose_Mean_goldEarned = []

win_gameDuration_List = []
win_kda_List = []
win_Mean_totalDamageDealtToChampions = []
win_Mean_goldEarned = []

for e in data:
    win,gameDuration,kda,totalDamageDealtToChampions,goldEarned = e
    if win == 'False':
        lose_gameDuration_List.append(gameDuration)
        lose_kda_List.append(kda)
        lose_Mean_totalDamageDealtToChampions.append(int(totalDamageDealtToChampions/gameDuration))
        lose_Mean_goldEarned.append(int(goldEarned/gameDuration))
    elif win == 'True' :
        win_gameDuration_List.append(gameDuration)
        win_kda_List.append(kda)
        win_Mean_totalDamageDealtToChampions.append(int(totalDamageDealtToChampions/gameDuration))
        win_Mean_goldEarned.append(int(goldEarned/gameDuration))
# print(win_gameDuration_List)

#######################################################################################################################################
conn.close()
try:
    allkda = win_kda_List+lose_kda_List
    Mean_totalDamageDealtToChampions = win_Mean_totalDamageDealtToChampions + lose_Mean_totalDamageDealtToChampions
    Mean_goldEarned = win_Mean_goldEarned + lose_Mean_goldEarned

    tier_data=[[t,g]for t,g in zip(Mean_totalDamageDealtToChampions,Mean_goldEarned)]

    #그래프
    # plt.scatter(win_Mean_totalDamageDealtToChampions, win_Mean_goldEarned) 
    # plt.scatter(lose_Mean_totalDamageDealtToChampions, lose_Mean_goldEarned)
    # # plt.xlim((0, 2000))
    # plt.title(championName + '정규화 전')
    # plt.xlabel('DAMAGE') 
    # plt.ylabel('GOLD') 
    # plt.show()


    tier_target=[1]*len(win_kda_List)+[0]*len(lose_kda_List)
    kn = KNeighborsClassifier(n_neighbors=3)

    kn.fit(tier_data,tier_target)
    a1 = kn.score(tier_data,tier_target)

    #z-정규화
    mean = np.mean(tier_data, axis=0)
    std = np.std(tier_data, axis=0)

    # print(mean, std)
    train_scaled = (tier_data - mean) / std

    # print(totalDamageDealtToChampions)
    # new = ([totalDamageDealtToChampions, goldEarned] - mean) / std
    new = (tier_my - mean) / std
    #그래프
    plt.scatter(train_scaled[:, 0], train_scaled[:, 1])
    plt.scatter(new[0], new[1], marker='^')
    plt.title(championName)
    plt.xlabel('DAMAGE')
    plt.ylabel('GOLD')
    plt.show()

    kn.fit(train_scaled, tier_target)
    a1 = kn.score(train_scaled, tier_target) # 1.0
    trans={1:'승', 0:'패'}
    a = trans[kn.predict([new])[0]]

    if len(tier_target) < 100 : 

        data5 = {key:"데이터부족" , "정확도" : a1 , "총데이터길이"  :len(tier_target), '캐릭' : championName, "key":"데이터부족"}
    else :
        data5 = {key:a , "정확도" : a1 , "총데이터길이"  :len(tier_target), '캐릭' : championName, "key" : a}  
    json_string = json.dumps(data5)
    # print(a, a1)
    print(json_string)
except Exception as e:
    data5 = {key:"에러" , "정확도" : 0 , "총데이터길이"  :0,  '캐릭' : championName, "key" : "에러"}  
    json_string = json.dumps(data5)
    # print(a, a1)
    print(json_string)