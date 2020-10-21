

export class reportHour
{
    index:number;
    key:string;
    day:number;
    year:number;
    month:number;
    sHour:number;
    sMinute:number;
    eHour:number;
    eMinute:number;
    dayWeek:number;
    weekDayNames=['א','ב','ג','ד','ה','ו','ש'];
    hours:number;
    dayName() {
        let str='';
        if ( this.day < 10  )  str+='0';
        str+=this.day.toString(); 
        str+="-";
        if ( this.month < 10  )  str+='0';
        str+=this.month.toString(); 
        str+="-";
        str+=this.year.toString(); 
        return str;
        //return (this.day < 10 ) ? '0' + this.day.toString() : this.day.toString() +'-'+ (this.month < 10 ) ? '0' +this.month.toString(): this.month.toString()+'-'+this.year.toString()   
    }
    formatTime(hour:number,minute:number)
    {
        let str:string='';
        if ( hour < 10 ) str+='0';
        str+=hour.toString(); 
        str+=":";
        if ( minute < 10 ) str+='0';
        str+=minute.toString(); 
        return str

    }
    timeStart() {
        return this.formatTime(this.sHour,this.sMinute)
    }
    timeEnd() {
        if ( this.eHour != null )
        return this.formatTime(this.eHour,this.eMinute)
        return '00:00'
    }
    weekDayName()
    {
        return this.weekDayNames[this.dayWeek]
    }
    hoursStr()
    {
        if ( this.hours)
        return this.hours.toFixed(2);
        return '0.00';
    }


}