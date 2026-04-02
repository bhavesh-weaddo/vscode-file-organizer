import os
import shutil

def showfiles(path=r'C:\Users\user\Downloads'):
    try:
        if os.path.isdir(path):
            print("Thanks for providing the path and  ")
            files = os.listdir(path)
            filestypecount = {}
            for file in files:
                ext  = file.split('.')[-1]
                if ext in filestypecount:
                    filestypecount[ext] +=1
                else:
                    filestypecount[ext]=1

            return filestypecount
        else:
            print("Given path is invalid")

    except :
        print("Something went wrong")
    

def organise(path=None):
    if path is None:
        return "No Path is given"
    try:
        if os.path.isdir(path):
            # first of all check the ext first and check if the folder exist or  not
            fileUnderFolder =  os.listdir(path)
            for file in fileUnderFolder:
                if os.path.isdir(os.path.join(path,file)):
                    continue
                
                ext   = file.split('.')[-1]
                targetFolder=  os.path.join(path,ext)
                if  not os.path.exists(targetFolder):
                    os.mkdir(targetFolder)

                print(file)
                

                shutil.move(os.path.join(path,file) ,os.path.join(targetFolder,file))
            return "files moved sucessfully!"        
        else:
            return "Invalid Path"

    except Exception as e:
        print(f"errror as {e}")
        return  "Something went wrong!"


