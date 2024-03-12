#-*- coding:utf-8 -*-
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import minmax_scale
from tqdm import tqdm
import time
import math
import joblib
#빅데이터전용
import pickle 
from sklearn.datasets import fetch_openml

data = sys.argv[1:]
matchId = data[0]
tier = data[1]
teamPosition = data[2]
gameDuration = int(data[3])
kda = float(data[4])
totalDamageDealtToChampions = int(int(data[5])/gameDuration* kda)
goldEarned = int(int(data[6])/gameDuration* kda)
championName = data[7]
queueId = str(data[8])
participantId = int(data[9])
champion_name_kr = data[10]
tier_my = [totalDamageDealtToChampions,goldEarned]
mean = np.mean(tier_my, axis=0)
std = np.std(tier_my, axis=0)

new = (tier_my - mean) / std
 
str1 ='src/main/resources/static/py/aiModelSave/aiModel420/'+ queueId+'_'+tier+'_'+championName+'.pkl'
# str2 = './'+queueId+'_'+tier+'_'+teamPosition+ '_' + championName+'.pickle'
# with open(str2,'rb') as f:
#     loaded_model = pickle.load(f)
# str2 = './420_BRONZE_JUNGLE_LeeSin.pkl'	
data = joblib.load(str1)

   
lose_gameDuration_List = []
# lose_kda_List = []
lose_Mean_totalDamageDealtToChampions = []
lose_Mean_goldEarned = []

win_gameDuration_List = []
# win_kda_List = []
win_Mean_totalDamageDealtToChampions = []
win_Mean_goldEarned = []

for e in data:
    win,gameDuration,kda,totalDamageDealtToChampions,goldEarned = e
    if win == 'False':
        lose_gameDuration_List.append(gameDuration)
        # lose_kda_List.append(kda)
        lose_Mean_totalDamageDealtToChampions.append(int(totalDamageDealtToChampions/gameDuration*kda))
        lose_Mean_goldEarned.append(int(goldEarned/gameDuration*kda))
    elif win == 'True' :
        win_gameDuration_List.append(gameDuration)
        # win_kda_List.append(kda)
        win_Mean_totalDamageDealtToChampions.append(int(totalDamageDealtToChampions/gameDuration*kda))
        win_Mean_goldEarned.append(int(goldEarned/gameDuration*kda))
# print(win_gameDuration_List)

#######################################################################################################################################
if len(win_Mean_goldEarned) > len(lose_Mean_goldEarned) : 

    win_Mean_goldEarned = win_Mean_goldEarned[ : len(lose_Mean_goldEarned)]
    win_Mean_totalDamageDealtToChampions = win_Mean_totalDamageDealtToChampions[ : len(lose_Mean_totalDamageDealtToChampions)]

elif len(lose_Mean_goldEarned) > len(win_Mean_goldEarned) : 


    lose_Mean_goldEarned = lose_Mean_goldEarned[ : len(win_Mean_goldEarned)]
    lose_Mean_totalDamageDealtToChampions = lose_Mean_totalDamageDealtToChampions[ : len(win_Mean_totalDamageDealtToChampions)]

if  len(lose_Mean_goldEarned) > 50 :
    lose_Mean_goldEarned = lose_Mean_goldEarned[ : 50]
    win_Mean_goldEarned = win_Mean_goldEarned[ : 50]
    lose_Mean_totalDamageDealtToChampions = lose_Mean_totalDamageDealtToChampions[ : 50]
    win_Mean_totalDamageDealtToChampions = win_Mean_totalDamageDealtToChampions[ : 50]



try:

    Mean_totalDamageDealtToChampions = win_Mean_totalDamageDealtToChampions + lose_Mean_totalDamageDealtToChampions
    Mean_goldEarned = win_Mean_goldEarned + lose_Mean_goldEarned

    tier_data=[[t,g]for t,g in zip(Mean_totalDamageDealtToChampions,Mean_goldEarned)]

    #그래프
    plt.scatter(win_Mean_totalDamageDealtToChampions, win_Mean_goldEarned) 
    plt.scatter(lose_Mean_totalDamageDealtToChampions, lose_Mean_goldEarned)
    # plt.xlim((0, 2000))
    # plt.title(championName)
    # plt.xlabel('DAMAGE') 
    # plt.ylabel('GOLD') 
    # plt.show()


    tier_target=[1]*len(win_Mean_goldEarned)+[0]*len(lose_Mean_goldEarned)
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
    # plt.scatter(train_scaled[:, 0], train_scaled[:, 1])
    # plt.scatter(new[0], new[1], marker='^')
    # plt.title(championName)
    # plt.xlabel('length')
    # plt.ylabel('weight')
    # plt.show()

    kn.fit(train_scaled, tier_target)
    a1 = kn.score(train_scaled, tier_target) # 1.0
    trans={1:'승', 0:'패'}
    a = trans[kn.predict([new])[0]]

    data5 = {'matchId': matchId ,'participantId':participantId, "accuracy" : a1 , "length"  :len(tier_target), 'tier' : tier , 'championName' : championName, 'champion_name_kr':champion_name_kr,"key" : a,  "rankingS" : int(new[0]+new[1])}  
    json_string = json.dumps(data5)
    print(json_string)
except Exception as e:
    data5 = {'matchId': matchId ,'participantId':participantId, "accuracy" : 0 , "length"  :0, 'tier' : tier , 'championName' : championName,'champion_name_kr':champion_name_kr, "key" : "error","rankingS" : int(new[0]+new[1])}  
    json_string = json.dumps(data5)
    print(json_string)