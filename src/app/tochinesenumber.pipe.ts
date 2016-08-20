import { Pipe, PipeTransform } from '@angular/core';

function intToChineseNumberString(useLowerType) {
    var obj = this;//待回傳的物件
    var numLower = Array('○', '一', '二', '三', '四', '五', '六', '七', '八', '九');//小寫中文
    var numUpper = Array('零', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖');//大寫中文
    var numTarget = useLowerType ? numLower : numUpper;//指定要用哪一個中文（大小寫）
    var numLowerUnit1 = Array('','十','百','千');//小寫中文小單位
    var numLowerUnit2 = Array('', '拾', '佰', '仟');//大寫中文小單位
    var numLowerTarget = useLowerType ? numLowerUnit1 : numLowerUnit2;//指定要用哪一個中文（小單位）
    var numLowerUnitLength = 4;//小單位長度
    var numLargeUnit = Array('', '萬', '億', '兆', '京', '垓', '秭', '穰', '溝', '澗', '正', '載', '極');//中文大單位
    var numNegative = "-";//負值
    //判斷是否為數值型態
    obj.checkIsNumber = function (number) {
        return !isNaN(parseInt(number));
    }
    obj.getResult = function (number)
    {
        //如果不是數值，則擲出例外
        if (!this.checkIsNumber(number)) {
            Error("輸入的形態不是Number");
            throw new Error("輸入的形態不是Number");
        }
        //如果是零，則直接輸出
        else if (number == 0) return numTarget[0];
        //轉成字串(使用絕對值避免處理負號)
        var numberString = String(Math.abs(number));
        //準備輸出的字串
        var output = "";
        //小單位(四位數)的傳回值(傳入數字字串)
        var getCurrentPart = function (numString)
        {
            //拆解成陣列
            numString = numString.split("");
            //預設回傳結果
            var result = "";
            //是否輸出過1-9
            var isLastNumberNonZero = false;
            //從後往前掃
            //1011一千○一十一
            for (var index = numString.length - 1; index >= 0 ; index--)
            {
                //目前位數
                var currentDigit = numString.length - index;
                //目前的數字
                var currentNumber = +numString[index];
                //上一個位數為非0
                //剛開始為false(沒有上一個位數)，之後會偵測上一個位數(之前的小位數)是否為非0
                isLastNumberNonZero = ((index + 1) == numString.length) ? false : (+numString[index + 1] > 0);
                //剛開始遇到零不處理，除非有之後遇到1-9
                if (isLastNumberNonZero || currentNumber > 0)
                    result = numTarget[currentNumber]//數字
                        + (currentNumber > 0 ? numLowerTarget[(currentDigit - 1) % numLowerUnitLength] : "")//小單位(個十百千) 大於0才會輸出
                        + result;//上一個位數
            }
            return result;
        };
        //剛開始小單位長度(前面多出的部份)，Ex 10000，多出的部份為1
        var initialPartLegth = numberString.length % numLowerUnitLength;
        if (initialPartLegth > 0)
            output = getCurrentPart(numberString.substr(0, initialPartLegth)) + numLargeUnit[Math.floor(numberString.length / 4)];
        //之後每次掃四個位數
        for (var i = initialPartLegth; i < numberString.length; i += numLowerUnitLength)
        {
            var partResult = getCurrentPart(numberString.substr(i, numLowerUnitLength));
            output += partResult + (partResult!=""? numLargeUnit[(numberString.length - i) / 4 - 1] : "");
        }
        //回傳時如有負值，則加上-
        return (number < 0 ? numNegative : "") + output;
    }
}

@Pipe({
  name: 'tochinesenumber'
})
export class ToChineseNumberPipe implements PipeTransform {

  transform(value: number, useLowerType: boolean = true): any {
    var obj = new intToChineseNumberString(useLowerType);
    return obj.getResult(value);
  }

}

