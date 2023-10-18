import os
from bs4 import BeautifulSoup
import pyautogui
import time


def addAllDOM(destinationPath):
    mainDirectory = os.path.dirname(__file__)

    headSource = 'components/headtag.html'
    navSource = 'components/navbar.html'
    footSource = 'components/footer.html'
    scriptSource = 'components/script.html'

    destinationPath = os.path.join(mainDirectory, destinationPath)
    needDeletes = ['link', 'script']
    with open(destinationPath, 'r', encoding='utf-8') as destination_file:
        destinationContent = BeautifulSoup(destination_file, 'html.parser')
        for dels in needDeletes:
            hasDelete = destinationContent.find_all(dels)
            for tag in hasDelete:
                tag.decompose()

    allPathes = [headSource, navSource, scriptSource, footSource]
    allTargets = ['head', 'nav', 'body', 'footer']

    for path, targetStr in zip(allPathes, allTargets):
        path = os.path.join(mainDirectory, path)
        if not os.path.exists(path):
            print(f'\033[31mError {path} not Found!')
            return

        with open(path, 'r', encoding='utf-8') as file:
            pathContent = file.read()

        sourceSoup = BeautifulSoup(pathContent, 'html.parser')

        if targetStr == 'nav':
            navTarget = destinationContent.find('nav', {'id': 'targetNav'})
            if navTarget:
                navTarget.clear()

        if targetStr == 'footer':
            footTarget = destinationContent.find('footer')
            if footTarget:
                footTarget.clear()

        targetTag = destinationContent.find(targetStr)

        if targetTag:
            targetTag.append(sourceSoup)

    with open(destinationPath, 'w', encoding='utf-8') as destination_file:
        destination_file.writelines(line for line in str(
            destinationContent).splitlines(True) if line.strip())



allFiles = ['index.html','pages\homeblog.html', 'pages\stuff.html','pages\post.html']

for aFile in allFiles:
    addAllDOM(aFile)
    aFileName = aFile.replace('pages\\', '') 
    print(f'Mission Complete Sire ----> in {aFileName}')
