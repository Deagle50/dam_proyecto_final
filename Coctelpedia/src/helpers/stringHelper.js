const getRandomString = (prevStr, strList) => {    
    //returns a random string from strList, validating it's not the same as prevStr
    let rand = Math.floor((Math.random() * strList.length) + 0);
        while(prevStr===strList[rand])
        {
            rand = Math.floor((Math.random() * strList.length) + 0);
        }
    return strList[rand];
}

export default {getRandomString};