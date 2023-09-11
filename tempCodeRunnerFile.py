    for pathStr in allPaths_str:
            full_path = os.path.join(mainDirectory, pathStr)
            if not os.path.exists(full_path):
                print(f'\033[31mError {full_path} not Found!')
            else:
                with open(full_path, 'r', encoding='utf-8') as fileContent:
                    content = fileContent.read()
                    soup = BeautifulSoup(content, 'html.parser')
                    # اکنون شما می‌توانید با تغییرات خود بر روی متغیر "soup" کار کنید
                    # مثلا: print(soup.prettify()) یا سایر عملیات مورد نیاز
                    # خروجی را در اینجا چاپ کنید
                    print(soup.prettify())