import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import json
from sklearn.neighbors import KNeighborsClassifier
kn = KNeighborsClassifier()
# fish = pd.read_csv('https://bit.ly/fish_csv_data')
# df = fish.head()
# df
data = sys.argv[1:]
cs = int(data[0])
ward = int(data[1])

#미드라이너의 경기당 와드 구매 개수, 분당 cs를 통해 사용자 티어 예측
# 다이아 티어 이상 유저의 데이터
dia_ward_set = [5, 5, 5, 6, 4, 8, 7, 6, 5, 7]
dia_cs_per_game = [90, 100, 80, 110, 100, 100, 80, 90, 110, 100]

# 다이아 티어 미만 유저의 데이터
ibsgp_ward_set = [2, 1, 0, 3, 4, 5, 4, 2, 2, 3]
ibsgp_cs_per_game = [50, 60, 50, 40, 60, 50, 40, 60, 70, 50]

ward_set=dia_ward_set+ibsgp_ward_set
cs_per_game=dia_cs_per_game+ibsgp_cs_per_game

tier_data=[[w,c]for w, c in zip(ward_set,cs_per_game)]

tier_target=[1]*len(dia_ward_set)+[0]*len(ibsgp_ward_set)
kn.fit(tier_data,tier_target)

kn.score(tier_data,tier_target)
# kn.score(tier_data,tier_target)

trans={1:'다이아 이상 티어로 예측됩니다.', 0:'다이아 미만으로 예상됩니다.'}
a = trans[kn.predict([[ward,cs]])[0]]
# print(a)
# print(trans[kn.predict([[cs,ward]])[0]])
data = {"result":a}
json_string = json.dumps(data)

print(json_string)



