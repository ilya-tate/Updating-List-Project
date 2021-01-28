"use strict";


let passengerArr = [];
let passengerClassArr = [];

class Passenger {
    constructor(nameFirst, nameLast, dob, cityDepart, cityDestin, dateLeave, dateReturn, bagNum, meal, extras, canDrink, extraCost, timeLeft, id) {
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.dob = dob;
        this.cityDepart = cityDepart;
        this.cityDestin = cityDestin;
        this.dateLeave = dateLeave;
        this.dateReturn = dateReturn;
        this.bagNum = bagNum;
        this.meal = meal;
        this.extras = extras;
        this.canDrink = canDrink;
        this.extraCost = extraCost;
        this.timeLeft = timeLeft;
        this.id = id;
    }
}

function submit() {
    let required = document.getElementsByClassName("required");
    console.log(required);
    let requiredFilled;
    for(let i = 0; i < required.length; i++) {
        console.log(required[i].value);
        if(required[i].value == "") {
            alert("Please fill out the required infromation.");
            requiredFilled = false;
            break;
        }
    }

    if(requiredFilled != false) {
        let nameFirst = document.getElementById("nameFirst").value;
        let nameLast = document.getElementById("nameLast").value;
        let dob = new Date(document.getElementById("dob").value);
        let cityDepart = document.getElementById("cityDepart").value;
        let cityDestin = document.getElementById("cityDestin").value;
        let dateLeave = new Date(document.getElementById("dateLeave").value);
        let dateReturn = new Date(document.getElementById("dateReturn").value);
        let bagNum = document.getElementById("bagNum").value;

        let meal = '';
        if(document.getElementById("meal.chicken").checked) {
            meal = document.getElementById("meal.chicken").value;
        } else if(document.getElementById("meal.fish").checked) {
            meal = document.getElementById("meal.fish").value;
        } else if (document.getElementById("meal.vege").checked) {
            meal = document.getElementById("meal.vege").value;
        } else {
            meal = null;
        }

        let extraCost = 300;
        extraCost += bagNum * 20;

        let extras = [];
        if(document.getElementById("extras.legroom").checked) {
            extras.push(document.getElementById("extras.legroom").value);
            extraCost += 10;
        }
        if(document.getElementById("extras.window").checked) {
            extras.push(document.getElementById("extras.window").value);
            extraCost += 10;
        }
        if (document.getElementById("extras.headphones").checked) {
            extras.push(document.getElementById("extras.headphones").value);
            extraCost += 10;
        }
        if (document.getElementById("extras.food").checked) {
            extras.push(document.getElementById("extras.food").value);
            extraCost += 10;
        }
        if(extras.length == 0) {
            extras = null;
        }

        let id = assignId();
        let canDrink = checkCanDrink(dob);
        let timeLeft = findTimeLeft(dateLeave, dateReturn);

        passengerArr.push(`${id} ${nameLast} ${nameFirst}`);
        console.log(passengerArr);

        let user = new Passenger(nameFirst, nameLast, dob, cityDepart, cityDestin, dateLeave, dateReturn, bagNum, meal, extras, canDrink, extraCost, timeLeft, id);
        passengerClassArr.push(user);
        console.log(user);
    }
}


function search() {
    let input = document.getElementById("search").value;
    for (let i = 0; i < passengerArr.length; i++) {
        let thisPassengerArr = passengerArr[i].split(' ')
        if (input == thisPassengerArr[0] || input == `${thisPassengerArr[2]} ${thisPassengerArr[1]}`) {
            let thisPassengerClassArr = passengerClassArr[i];
            console.log(thisPassengerClassArr);
            let userId = `ID: ${thisPassengerClassArr.id}`;
            let userNameFirst = `First Name: ${thisPassengerClassArr.nameFirst}`;
            let userNameLast = `Last Name: ${thisPassengerClassArr.nameLast}`;
            let userDob = `Date of Birth: ${thisPassengerClassArr.dob}`;
            let userCityDepart = `Departing City: ${thisPassengerClassArr.cityDepart}`;
            let userCityDestin = `Destination City: ${thisPassengerClassArr.cityDestin}`;
            let userDateLeave = `Departing Date: ${thisPassengerClassArr.dateLeave}`;
            let userDateReturn = `Returning Date: ${thisPassengerClassArr.dateReturn}`;
            let userbagNum = `Number of Bags: ${thisPassengerClassArr.bagNum}`;
            let userMeal = `Meal: ${thisPassengerClassArr.meal}`;
            let userExtras = `Extra Options: ${thisPassengerClassArr.extras}`;
            let userCanDrink = `Is Over 21: ${thisPassengerClassArr.canDrink}`;
            let userExtraCost = `Extra Costs: ${thisPassengerClassArr.extraCost}`;
            let userTimeLeft = `Amount of Time Gone: ${thisPassengerClassArr.timeLeft}`;
            let userInfo = `${userId}<br>${userNameFirst}<br>${userNameLast}<br>${userDob}<br>${userCityDepart}<br>${userCityDestin}<br>${userDateLeave}<br>${userDateReturn}<br>${userbagNum}<br>${userMeal}<br>${userExtras}<br>${userCanDrink}<br>${userExtraCost}<br>${userTimeLeft}`
            console.log(userInfo);
            let output = document.getElementById("output");
            output.innerHTML = "";
            output.innerHTML += `${userInfo}`;
            break;
        }
    }
}


function rng(max) {
    max++;
    return Math.floor(Math.random() * max);
}

function assignId() {
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += rng(9);
    }
    return +id;
}

function checkCanDrink(dob) {
    let today = new Date();
    let todayD = today.getDate();
    let todayM = today.getMonth()
    let todayY = today.getFullYear();

    dob = new Date(dob);
    let dobD = dob.getDate();
    let dobM = dob.getMonth();
    let dobY = dob.getFullYear();

    if (todayY - dobY > 21) {
        return true;
    } else if (todayY - dobY == 21 && dobM >= todayM && dobD >= todayD) {
        return true;
    } else {
        return false;
    }
}

function findTimeLeft(dateLeave, dateReturn) {
    if (dateLeave instanceof Date) {
        dateLeave = new Date(dateLeave);
    }
    if (dateLeave instanceof Date) {
        dateReturn = new Date(dateReturn);
    }

    let dateLeaveD = dateLeave.getDate();
    let dateLeaveM = dateLeave.getMonth();
    let dateLeaveY = dateLeave.getFullYear();

    let dateReturnD = dateReturn.getDate();
    let dateReturnM = dateReturn.getMonth();
    let dateReturnY = dateReturn.getFullYear();


    let timeLeftD = dateReturnD - dateLeaveD;
    let timeLeftM = dateReturnM - dateLeaveM;
    let timeLeftY = dateReturnY - dateLeaveY;
    if(isNaN(timeLeftD) == true) {
        timeLeftD = 0;
    } else if(timeLeftD < 0) {
        timeLeftD *= -1;
    }
    if (isNaN(timeLeftM) == true) {
        timeLeftM = 0;
    } else if(timeLeftM < 0) {
        timeLeftM *= -1;
    }
    if (isNaN(timeLeftY) == true) {
        timeLeftY = 0;
    }

    return `${timeLeftY} Year(s), ${timeLeftM} Month(s), and ${timeLeftD} Day(s) gone`;
}


function generateRandomUser(amt) {
    for(let i = 0; i < amt; i++) {
        let name = generateName();
        let nameFirst = name[0];
        let nameLast = name[1];


        let dob = randomDate(('1950-01-01'), (new Date()));

        let cityDepart = generateCity();
        let cityDestin = generateCity();

        let latestDate = new Date('2021-12-30');
        let dateLeave;
        let dateReturn;
        do {
            dateLeave = randomDate((new Date()), latestDate);
            dateReturn = randomDate(dateLeave, latestDate);
        } while(dateLeave > dateReturn);

        let bagNum = rng(4);

        let meal = ['chicken', 'fish', 'vegetarian'];
        meal = meal[rng(2)];

        let extrasOpt = [document.getElementById("extras.legroom").value, document.getElementById("extras.window").value, document.getElementById("extras.headphones").value, document.getElementById("extras.food").value];
        let extras = [];
        for(let i = 0; i < extrasOpt.length; i++) {
            if(rng(9) == 0) {
                extras.push(extrasOpt[i]);
            }
        }

        let canDrink = checkCanDrink(dob);

        let extraCost = 300 + (bagNum * 20) + (extras.length * 10);

        let timeLeft = findTimeLeft(dateLeave, dateReturn);

        let id = assignId();

        let user = new Passenger(nameFirst, nameLast, dob, cityDepart, cityDestin, dateLeave, dateReturn, bagNum, meal, extras, canDrink, extraCost, timeLeft, id);
        passengerClassArr.push(user);
        console.log(user);

        passengerArr.push(`${+id} ${nameLast} ${nameFirst}`);
        console.log(passengerArr);
    }
}

function generateName() {
    let randomNames = `Brooklyn O'Doherty
Teodor Patterson
Maxwell Beaumont
Alaw Nolan
Cooper Pitts
Brook Mcdaniel
Owais Lowery
Xavier Frye
Emillie Jefferson
Rhiana Mcculloch
Nisha Correa
Corey Joseph
Izzie Mckeown
Ashlea Stuart
Iwan Rivers
Haleema Maxwell
Annabell Kavanagh
Frankie Bowes
Kitty Estes
Harmony Joyner
Krystal Rojas
Elsie May Lu
Ada Delacruz
Sebastian Gibbs
Marek Allen
Kylan Macfarlane
Elana Fleming
Marvin Pruitt
Lindsey Porter
Aaminah Ponce
Lena Mays
Kaif Bass
Grant Busby
Bear Huffman
Skye Povey
Haydn Woods
Imaad Cresswell
Iris Greaves
Santiago Orr
Martyna Bartlett
Khalil Wade
Robert Choi
Gabriella Avila
Reid Davis
Lylah Hatfield
Kalvin Marin
Karen English
Kiefer Philip
Henley Andrews
Mea Bautista
Anas Rivas
Kady Clark
Melissa Bate
Tadhg Villegas
Dante Deleon
Abbie Mercado
Nadine Herman
Prince Howell
Dewi Corona
Marwan Holmes
Faizan Howarth
Danniella Bird
Sameera Stubbs
Drew Haines
Laurence Buck
Ashlyn Adkins
Amelie Mcgill
Jameel Benton
Antonio Strong
Alexander Reid
Tessa Cooke
Jesus Storey
Josef Barrett
Keyan Rich
Alvin Lamb
Riaz Reeves
Traci Stanton
Alima Mccartney
Ivan Guevara
Farhana O'Ryan
Jacob Kim
Keiran Maddox
Kavita Matthams
Mehmet Mcintyre
Eliza Mosley
Randy Kline
Rohaan Bassett
Kacey Neal
Zunaira Stevenson
Chandni O'Quinn
Katerina Wilson
Zavier Timms
Aleena Kinney
Aronas Reed
Eboni Kent
Derren Hutchings
Simeon Woolley
Makenzie Watt
Nick Alford
Alina Foreman`;
    randomNames = randomNames.split('\n');
    let name = randomNames[rng(randomNames.length - 1)];
    return name.split(' ');
}

function generateCity() {
    let randomCities = `1,New York,New York,8405837,4.8%
2,Los Angeles,California,3884307,4.8%
3,Chicago,Illinois,2718782,-6.1%
4,Houston,Texas,2195914,11.0%
5,Philadelphia,Pennsylvania,1553165,2.6%
6,Phoenix,Arizona,1513367,14.0%
7,San Antonio,Texas,1409019,21.0%
8,San Diego,California,1355896,10.5%
9,Dallas,Texas,1257676,5.6%
10,San Jose,California,998537,10.5%
11,Austin,Texas,885400,31.7%
12,Indianapolis,Indiana,843393,7.8%
13,Jacksonville,Florida,842583,14.3%
14,San Francisco,California,837442,7.7%
15,Columbus,Ohio,822553,14.8%
16,Charlotte,North Carolina,792862,39.1%
17,Fort Worth,Texas,792727,45.1%
18,Detroit,Michigan,688701,-27.1%
19,El Paso,Texas,674433,19.4%
20,Memphis,Tennessee,653450,-5.3%
21,Seattle,Washington,652405,15.6%
22,Denver,Colorado,649495,16.7%
23,Washington,District of Columbia,646449,13.0%
24,Boston,Massachusetts,645966,9.4%
25,Nashville-Davidson,Tennessee,634464,16.2%
26,Baltimore,Maryland,622104,-4.0%
27,Oklahoma City,Oklahoma,610613,20.2%
28,Louisville/Jefferson County,Kentucky,609893,10.0%
29,Portland,Oregon,609456,15.0%
30,Las Vegas,Nevada,603488,24.5%
31,Milwaukee,Wisconsin,599164,0.3%
32,Albuquerque,New Mexico,556495,23.5%
33,Tucson,Arizona,526116,7.5%
34,Fresno,California,509924,18.3%
35,Sacramento,California,479686,17.2%
36,Long Beach,California,469428,1.5%
37,Kansas City,Missouri,467007,5.5%
38,Mesa,Arizona,457587,13.5%
39,Virginia Beach,Virginia,448479,5.1%
40,Atlanta,Georgia,447841,6.2%
41,Colorado Springs,Colorado,439886,21.4%
42,Omaha,Nebraska,434353,5.9%
43,Raleigh,North Carolina,431746,48.7%
44,Miami,Florida,417650,14.9%
45,Oakland,California,406253,1.3%
46,Minneapolis,Minnesota,400070,4.5%
47,Tulsa,Oklahoma,398121,1.3%
48,Cleveland,Ohio,390113,-18.1%
49,Wichita,Kansas,386552,9.7%
50,Arlington,Texas,379577,13.3%
51,New Orleans,Louisiana,378715,-21.6%
52,Bakersfield,California,363630,48.4%
53,Tampa,Florida,352957,16.0%
54,Honolulu,Hawaii,347884,-6.2%
55,Aurora,Colorado,345803,24.4%
56,Anaheim,California,345012,4.7%
57,Santa Ana,California,334227,-1.2%
58,St. Louis,Missouri,318416,-8.2%
59,Riverside,California,316619,22.5%
60,Corpus Christi,Texas,316381,14.1%
61,Lexington-Fayette,Kentucky,308428,18.0%
62,Pittsburgh,Pennsylvania,305841,-8.3%
63,Anchorage,Alaska,300950,15.4%
64,Stockton,California,298118,21.8%
65,Cincinnati,Ohio,297517,-10.1%
66,St. Paul,Minnesota,294873,2.8%
67,Toledo,Ohio,282313,-10.0%
68,Greensboro,North Carolina,279639,22.3%
69,Newark,New Jersey,278427,2.1%
70,Plano,Texas,274409,22.4%
71,Henderson,Nevada,270811,51.0%
72,Lincoln,Nebraska,268738,18.0%
73,Buffalo,New York,258959,-11.3%
74,Jersey City,New Jersey,257342,7.2%
75,Chula Vista,California,256780,46.2%
76,Fort Wayne,Indiana,256496,1.0%
77,Orlando,Florida,255483,31.2%
78,St. Petersburg,Florida,249688,0.3%
79,Chandler,Arizona,249146,38.7%
80,Laredo,Texas,248142,38.2%
81,Norfolk,Virginia,246139,5.0%
82,Durham,North Carolina,245475,29.9%
83,Madison,Wisconsin,243344,15.8%
84,Lubbock,Texas,239538,19.6%
85,Irvine,California,236716,61.3%
86,Winston-Salem,North Carolina,236441,16.9%
87,Glendale,Arizona,234632,5.7%
88,Garland,Texas,234566,8.5%
89,Hialeah,Florida,233394,3.2%
90,Reno,Nevada,233294,26.8%
91,Chesapeake,Virginia,230571,15.1%
92,Gilbert,Arizona,229972,96.0%
93,Baton Rouge,Louisiana,229426,0.4%
94,Irving,Texas,228653,19.1%
95,Scottsdale,Arizona,226918,11.0%
96,North Las Vegas,Nevada,226877,92.2%
97,Fremont,California,224922,10.0%
98,Boise City,Idaho,214237,9.5%
99,Richmond,Virginia,214114,8.2%
100,San Bernardino,California,213708,13.0%`;
    randomCities = randomCities.split('\n');
    let city = randomCities[rng(randomCities.length)];
    city = city.split(',')[1];
    return city;
}

function randomDate(earliestDate, latestDate) {
    earliestDate = new Date(earliestDate);
    latestDate = new Date(latestDate);
    let yr = rng(latestDate.getFullYear() - earliestDate.getFullYear()) + earliestDate.getFullYear();
    let mon = rng(latestDate.getMonth() - earliestDate.getMonth());
    let day = rng(latestDate.getDate() - earliestDate.getDate());

    return new Date(yr, mon, day)
}