import os
from bs4 import BeautifulSoup

def addAllDOM(destinationPath):
    mainDirectory = os.path.dirname(__file__)

    headSource = 'components/headtag.html'
    navSource = 'components/navbar.html'
    scriptSource = 'components/script.html'

    destinationPath = os.path.join(mainDirectory, destinationPath)

    with open(destinationPath, 'r', encoding='utf-8') as destination_file:
        destination_content = BeautifulSoup(destination_file, 'html.parser')

    allPathes = [headSource, navSource, scriptSource]
    allTargets = ['head', 'nav', 'body']

    for path, targetStr in zip(allPathes, allTargets):
        path = os.path.join(mainDirectory, path)
        if not os.path.exists(path):
            print(f'\033[31mError {path} not Found!')
            return

        with open(path, 'r', encoding='utf-8') as file:
            pathContent = file.read()

        sourceSoup = BeautifulSoup(pathContent, 'html.parser')

        if targetStr == 'nav':
            nav_target = destination_content.find('nav')
            if nav_target:
                if not nav_target.has_attr('id'):
                    nav_target['id'] = 'targetNav'

        target_tag = destination_content.find(targetStr)

        if target_tag:
            target_tag.append(sourceSoup)

    with open(destinationPath, 'w', encoding='utf-8') as destination_file:
        destination_file.write(str(destination_content))
    print('Mission Complete Sire')

allFiles = ['pages\homeblog.html','pages\stuff.html']
# 'index.html',
for aFile in allFiles:
    addAllDOM(aFile)