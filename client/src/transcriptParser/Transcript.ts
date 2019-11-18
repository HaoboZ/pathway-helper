
import {classPrefixes, quarters} from './constants';

let transcript = class Transcript {
    courses: any[];
    major: string;
    name: string;
    constructor(text){
        console.log("abc");
        this.courses = [];
        let tl = text.split("\n");
        let r = {};
        let quarter = undefined;
        let year = undefined;
        let line;
        this.name = "Not found in transcript";
        this.major = "Not found in transcript";
        //loop through every line in the transcript
        for(let l = 0; l < tl.length; l++){

            line = tl[l];
            let {lineType,data,relevantData} = Transcript.parseLineType(line, r);
            r = relevantData;
            if(lineType === "course"){
                console.log("COURSE");
                data.quarterTaken = quarter;
                data.yearTaken = year;
                console.log(data);
                this.courses.push(data);
            }
            else if(lineType === "quarterDescriptor"){
                console.log("NEW QUARTER");
                quarter = data.quarter;
                year = data.year;
                console.log(data);

            }
            else if(lineType === "name"){
                this.name = data.name;
                console.log(data)
            }
            else if(lineType === "major"){
                this.major = data.major;
                console.log(data)
            }

        }


    }
    //parse data from course description lines and quarter description lines
    static parseLineType(line, relevantData){
        let words = line.split(" ");
        if(words.length === 0){
            return {lineType:"none",data:{}, relevantData:undefined}
        }

        if(words.length == 5 && quarters.includes(words[0]) && !Number.isNaN(Number.parseInt(words[1]))){
            return {
                lineType:"quarterDescriptor",
                data:{quarter:words[0],year:words[1]},
                relevantData:undefined
            }
        }
        else if(words.length > 5 && classPrefixes.includes(words[0])){
            let courseTitle = "";
            let hasGradeModifier = 0;

            if(Number.isNaN(parseInt(words[words.length-2]) )){
                hasGradeModifier = 1;
            }

            for(let i = words.length - 4 - hasGradeModifier; i > 1; i--){
                courseTitle =  words[i] + " " + courseTitle;
            }
            courseTitle = courseTitle.slice(0, -1);//trailing whitespace
            return {
                lineType:"course",
                data:{coursePrefix:words[0],courseNum:words[1],courseTitle:courseTitle,completed:!!hasGradeModifier,quarterTaken:undefined,yearTaken:undefined},
                relevantData:undefined
            }
        }
        else if(words[0] == "Name:"){
            if(words.join(" "). indexOf("Student ID:") >= 0){
                return {
                    lineType:"name",
                    data:{name:words.slice(1,words.length-3).join(" ")},
                    relevantData:undefined
                }
            }
            else{
                return {
                    lineType:"name",
                    data:{name:words.slice(1,words.length).join(" ")},
                    relevantData:undefined
                }
            }

        }
        else if(words.join(" ").indexOf("Active in Program") >= 0){
            return {
                lineType:"activeInProgram",
                data:{},
                relevantData:{"activeInProgram":true}
            }
        }
        else if(relevantData !== undefined && relevantData.activeInProgram && words[words.length-1] == "Major"){
             return {
                lineType:"major",
                data:{major: words.slice(0,words.length-1).join(" ")},
                relevantData:{"activeInProgram":true}
            }

        }

        return {lineType:"none",data:{},relevantData:undefined}
    }




};
export default transcript
