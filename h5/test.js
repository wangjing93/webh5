/**
 * Created by WangJing on 2016/11/28.
 */
var arr1 = [1, 3, "b", "a", 0, 22];
var arr2 = [3, "c", "a", 4, "0"];
var arr3 = new Array();
var index = 0;
for (var i = 0; i < arr1.length; i++) {
    for (j = 0; i < arr2.length; j++) {
        if(arr1[i] === arr2[j]) {
            arr3[index] = arr1[i];
            index++;
        }
    }
}
console.log(arr3);