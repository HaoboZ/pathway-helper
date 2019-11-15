
import {classPrefixes, quarters} from './constants';

let transcript = class Transcript {
    courses: any[];

    constructor(text){
        console.log("abc");
        this.courses = [];
        let tl = text.split("\n");

        let quarter = undefined;
        let year = undefined;
        let line;

        //loop through every line in the transcript
        for(let l = 0; l < tl.length; l++){

            line = tl[l];
            let {lineType,data} = Transcript.parseLineType(line);
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

        }


    }
    //parse data from course description lines and quarter description lines
    static parseLineType(line){
        let words = line.split(" ");
        if(words.length === 0){
            return {lineType:"none",data:{}}
        }

        if(words.length == 5 && quarters.includes(words[0]) && !Number.isNaN(Number.parseInt(words[1]))){
            return {
                lineType:"quarterDescriptor",
                data:{quarter:words[0],year:words[1]}
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
                data:{coursePrefix:words[0],courseNum:words[1],courseTitle:courseTitle,completed:!!hasGradeModifier,quarterTaken:undefined,yearTaken:undefined}
            }
        }
        return {lineType:"none",data:{}}
    }




};
export default transcript
