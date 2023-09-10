import os
from bs4 import BeautifulSoup

allFiles = ['index.html','pages\homeblog.html']

def addAllDOM(htmlPath):
    mainDirectory = os.path.dirname(__file__)

    headSource = 'components\headtag.html'
    navSource = 'components\\navbar.html'
    scriptSource = 'components\script.html'

    headPath = os.path.join(mainDirectory, headSource)
    navPath = os.path.join(mainDirectory, navSource)
    scriptPath = os.path.join(mainDirectory, scriptSource)
    destinationPath = os.path.join(mainDirectory, htmlPath)


    allPathes = [headSource,navSource,scriptSource,destinationPath]

    for path in allPathes:
        if not os.path.exists(path):
            print(f'\033[31mError{path} not Found!')
            return
        else:
            print('Passed!')


    with open(htmlPath, 'r', encoding='utf-8') as fileContent:
        soup = BeautifulSoup(fileContent, 'html.parser')

    with open(htmlPath, 'r', encoding='utf-8') as fileContent:
        soup = BeautifulSoup(fileContent, 'html.parser')

    with open(htmlPath, 'r', encoding='utf-8') as fileContent:
        soup = BeautifulSoup(fileContent, 'html.parser')

    with open(htmlPath, 'r', encoding='utf-8') as fileContent:
        soup = BeautifulSoup(fileContent, 'html.parser')


for pathes in allFiles:
    addAllDOM(pathes)