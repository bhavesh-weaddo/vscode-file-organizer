from organisar import showfiles, organise




if __name__ ==  "__main__":
    print("What do you want to do ?")
    print("1. Want to list the files in your system along with extension byfercation!:  ")
    print("2. Want to list the files in your system along with extension byfercation!:  ")
    userInput =  input("Please choose: ")
    match(userInput):
        case "1":
            print("Please enter  your file location:") 
            UserPath = input("Enter the path where you want to organize the structure: ")
            print(showfiles(UserPath))
        case "2":
            print("Please enter  your file location that you want to organize:") 
            UserPath = input("Enter the path where you want to organize the structure: ")
            print(organise(UserPath))
        case "_":
            print("Wrong input")