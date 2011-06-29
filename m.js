//Mutialisation V1.155 Xiaodong Liu ludovic.liu@gmail.com  16:00 23 JUIN 2011
//Fix the IE Browser display problems


/////////////////////////////////////////////////////////////////////////////////////////
//author Liu Xiaodong   ver 1.156                                                      //
//EX: 1.152 ,1 Version Major,01 Version fonctionnelle ,0.052 Fixed bug version         //
//Create Date: 02/03/2011       Update data:23/06/2011                                 //
//e-mail:ludovic.liu@gmail.com                                                         //
//this program using for calcul mutualisation                                          //
//Requires Jquery 1.4.1 to support                                                     //
//Major reference Knapsack problem algorithm                                           //
//Sorting algorithm using Shell sort and Insertion sort                                //
//Add a method for the string Date Array                                               //
//Add HashTable Object suport                                                          //
//Add MD5 suport                                                                       //
/////////////////////////////////////////////////////////////////////////////////////////


// Statement Global Data
var edt_arr; // for saving all of EDT
var select_command = "";
var DefPageNum = 1;
///////////////////////////////////////////
//The definition of cargo capacity       //
// LCL -> 15m3                           //
// 20SD -> 30m3                          //
// 40SD -> 60m3                          //
// 40HQ -> 70m3                          //
///////////////////////////////////////////
var _LCL = 15;
var _20SD = 30;
var _40SD = 60;
var _40HQ = 70;
var Change_Rate_UE = 0.7;
var Total_Price = 0;
var Total_Volum = 0;
var VersionInfo = "v1.156";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////Reading data initialization////////////////////////////
//   03/03/2011                                                            //
//   Initialize the page data                                              //
//   Initializes all action and all the elements                           //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
		
		if ($("#TabMutualisation").length > 0) { //As in the template page. Determine the object loader to load the page
			init_page();
			$('.date-pick').datepicker(); //Initialization the time plugin
			setTimeout("$(\"#Loading\").hide(500)", 500);
			setTimeout("$(\"#MessageBody\").show(800)", 900);
			
		}
		
		$("#btn").click(function () { //Bookmark function. Calls in different browsers
				var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'Ctrl';
				if (document.all) {
					window.external.addFavorite(window.location, document.title);
				} else 
					if (window.sidebar) {
						window.sidebar.addPanel(document.title, window.location);
					} else {
						alert('faill please use Ctrl+D for add');
					}
			});
		$(".PrintTag").click(function(){
		
			//console.log();
			PringCode2D($(this).attr("ID"));
		
		});
		
	});

//-----initialization End-----------------------------


//////////////////////Javascript function expansion //////////////////////////
//   12/03/2011                                                             //
//   Javascript function expansion                                          //
//                                                                          //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////


//////////////////////Javascript HashTable Object   //////////////////////////
//   20/04/2011                                                             //
//   Suport Method : clear,containsKey,containsValue,get,isEmpty,keys,put   //
//    remove,size,toString,values                                           //
//    EX: var hashTable = new Hashtable();                                  //
//////////////////////////////////////////////////////////////////////////////

function Hashtable() {
	this.clear = hashtable_clear;
	this.containsKey = hashtable_containsKey;
	this.containsValue = hashtable_containsValue;
	this.get = hashtable_get;
	this.isEmpty = hashtable_isEmpty;
	this.keys = hashtable_keys;
	this.put = hashtable_put;
	this.remove = hashtable_remove;
	this.size = hashtable_size;
	this.toString = hashtable_toString;
	this.values = hashtable_values;
	this.hashtable = new Array();
}

function hashtable_clear() {
	this.hashtable = new Array();
}

function hashtable_containsKey(key) {
	try {
		var exists = false;
		for (var i in this.hashtable) {
			if (i == key && this.hashtable[i] != null) {
				exists = true;
				break;
			}
		}
	} catch (e) {
		throw new Error("Object HashTable Method containsKey error.Error:" + e);
	}
	finally{
		return exists;
	}
}

function hashtable_containsValue(value) {
	try {
		var contains = false;
		if (value === null || value == "") {
			throw new Error("Object HashTable Method containsValue error.NullPointerException: (" + value + "}");
		}
		for (var i in this.hashtable) {
			if (this.hashtable[i] == value) {
				contains = true;
				break;
			}
		}
		
	} catch (e) {
		throw new Error("Object HashTable Method containsValue error.Error:" + e);
	}
	finally{
		return contains;
	}
}

function hashtable_get(key) {
	if (key === null || key === "") {
		throw new Error("Object HashTable Method get error.NullPointerException");
	}
	return this.hashtable[key];
}

function hashtable_isEmpty() {
	return(this.size == 0) ? true : false;
}

function hashtable_keys() {
	try {
		var keys = new Array();
		for (var i in this.hashtable) {
			if (this.hashtable[i] != null) 
				keys.push(i);
		}
	} catch (e) {
		throw new Error("Object HashTable Method get error.Error:" + e);
	}
	finally{
		return keys;
	}
}

function hashtable_put(key, value) {
	try {
		if (key === null || value === null) {
			throw new Error("Object HashTable Method get error.NullPointerException:" + key + "},{" + value + "}");
		} else {
			this.hashtable[key] = value;
		}
	} catch (e) {
		throw new Error("Object HashTable Method put error.Error:" + e);
	}
}

function hashtable_remove(key) {
	if (key === null) {
		throw new Error("Object HashTable Method remove error.NullPointerException:" + key + "}");
	}
	var rtn = this.hashtable[key];
	//this.hashtable[key] =null;
	this.hashtable.splice(key, 1);
	return rtn;
}

function hashtable_size() {
	try {
		var size = 0;
		for (var i in this.hashtable) {
			if (this.hashtable[i] != null) 
				size++;
		}
	} catch (e) {
		throw new Error("Object HashTable Method size error.Error:" + e);
	}
	finally{
		return size;
	}
	
}

function hashtable_toString() {
	try {
		var result = '';
		for (var i in this.hashtable) {
			if (this.hashtable[i] != null) 
				result += '{' + i + '},{' + this.hashtable[i] + '}\n';
		}
	} catch (e) {
		throw new Error("Object HashTable Method toString error.Error:" + e);
	}
	finally{
		return result;
	}
}

function hashtable_values() {
	try {
		var values = new Array();
		for (var i in this.hashtable) {
			if (this.hashtable[i] != null) 
				values.push(this.hashtable[i]);
		}
	} catch (e) {
		throw new Error("Object HashTable Method values error.Error:" + e);
	}
	finally{
		return values;
	}
}

///////////////////////////MD5 Encoding and decoding/////////////////////////
//  01/03/2011     Message-Digest Algorithm                                //
//                                                                         //
//  MD5Encode(value);  return  hash                                        //
//  MD5Decode(hash);  return value                                         //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////

var MD5ts = "8ABC7DLO5MN6Z9EFGdeJfghijkHIVrstuvwWSTUXYabclmnopqKPQRxyz01234";
String.prototype.MD5Encode = function (n) //MD5 Encoding
{
	try {
		if (n === null || n === '') {
			throw new Error("Function MD5Encode(). Error:NullPointerException.");
		}
		var nl = n.length;
		var t = [];
		var a;
		var b;
		var c;
		var x;
		m = function (y) {
			t[t.length] = MD5ts.charAt(y);
		};
		var N = MD5ts.length;
		var N2 = N * N;
		var N5 = N * 5;
		for (x = 0; x < nl; x++) {
			a = n.charCodeAt(x);
			if (a < N5) 
				m(Math.floor(a / N)), m(a % N);
			else 
				m(Math.floor(a / N2) + 5), m(Math.floor(a / N) % N), m(a % N);
		}
		var s = t.join("");
		return String(s.length).length + String(s.length) + s;
	} catch (e) {
		throw new Error("Function MD5Encode(" + n + ").Error:" + e);
	}
};

String.prototype.MD5Decode = function (n) //MD5 Decoding
{
	try {
		if (n === null || n === '') {
			throw new Error("Function MD5Decode(). Error:NullPointerException.");
		}
		var c = n.charAt(0) * 1;
		if (isNaN(c)) {
			return "";
		}
		c = n.substr(1, c) * 1;
		if (isNaN(c)) {
			return "";
		}
		var nl = n.length;
		var t = [];
		var a;
		var f;
		var b;
		var x = String(c).length + 1;
		var m = function (y) {
			return MD5ts.indexOf(n.charAt(y));
		};
		var N = MD5.ts.length;
		if (nl != x + c) {
			return "";
		}
		while (x < nl) {
			a = m(x++);
			if (a < 5) {
				f = a * N + m(x);
			} else {
				f = (a - 5) * N * N + m(x) * N + m(x += 1);
			}
			t[t.length] = String.fromCharCode(f);
			x++;
		}
		return t.join("");
	} catch (e) {
		throw new Error("Function MD5Decode(" + n + ").Error:" + e);
	}
};

///////////////////////////////////////Sorted Array//////////////////////////
//  Suport 5 ways.                10/05/2011                               //
//  systemSort bubbleSort quickSort insertSort shellSort stepSort          //
//  var arr = [4,2,5,6,8,9,7,0,1,3];                                       //
//  SortedArray.array['shellSort'](arr);                                   //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
SortedArray = {
};
SortedArray.array = {
	
	df : function (len) {
		var array = [], 
		i;
		len = len || 1000;
		for (i = 0; i < len; i++) {
			array.push(i);
		}
		return array.sort(function () {
				return Math.random() > 0.5;
			});
	}, 
	// SortedArray.array.Statistics();
	test : function (method, arrayLength, callBack) {
		
		var times = [];
		var i = 0;
		var sum = 0;
		var len = 10;
		
		for (; i < len; i++) {
			test();
		}
		
		for (i = 0; i < times.length; i++) {
			sum += times[i];
		}
		
		function test() {
			var array = Jun.array.df(arrayLength);
			var st = new Date().getTime();
			Jun.array[method](array); //shellSort  quickSort  systemSort
			var d = new Date().getTime() - st;
			callBack && callBack(new Date().getTime() - st);
			times.push(d);
		}
		
		return sum / len;
	}, 
	
	// ---------- 
	//sort method
	systemSort : function (array) {
		return array.sort(function (a, b) {
				return a - b;
			});
	}, 
	//bubbleSort
	bubbleSort : function (array) {
		var i = 0, 
		len = array.length, 
		j, 
		d;
		for (; i < len; i++) {
			for (j = 0; j < len; j++) {
				if (array[i] < array[j]) {
					d = array[j];
					array[j] = array[i];
					array[i] = d;
				}
			}
		}
		return array;
	}, 
	// quickSort
	quickSort : function (array) {
		
		var i = 0;
		var j = array.length - 1;
		var Sort = function (i, j) {
			
			// finish 
			if (i == j) {
				return
			};
			
			var key = array[i];
			var stepi = i; // start
			var stepj = j; // end
			while (j > i) {
				// j <<-------------- Forward search
				if (array[j] >= key) {
					j--;
				} else {
					array[i] = array[j];
					//i++ ------------>back search
					while (j > ++i) {
						if (array[i] > key) {
							array[j] = array[i];
							break;
						}
					}
				}
			}
			
			// if the first key is minimum
			if (stepi == i) {
				Sort(++i, stepj);
				return;
			}
			
			// last one for  key
			array[i] = key;
			
			// Recursive
			Sort(stepi, i);
			Sort(j, stepj);
		};
		
		Sort(i, j);
		
		return array;
	}, 
	
	// insertSort
	insertSort : function (array) {
		
		var i = 1, 
		j, 
		step, 
		key, 
		len = array.length;
		
		for (; i < len; i++) {
			
			step = j = i;
			key = array[j];
			while (--j > -1) {
				if (array[j] > key) {
					array[j + 1] = array[j];
				} else {
					break;
				}
			}
			
			array[j + 1] = key;
		}
		
		return array;
	}, 
	
	// 
	shellSort : function (array) {
		
		var stepArr = [1750, 701, 301, 132, 57, 23, 10, 4, 1]; // reverse() 
		var stepArrForLong = [1031612713, 217378076, 45806244, 9651787, 2034035, 428481, 90358, 19001, 4025, 836, 182, 34, 9, 1];
		var i = 0;
		var stepArrLength = stepArr.length;
		var len = array.length;
		var len2 = parseInt(len / 2);
		if (len > 3500) {
			stepArr = stepArrForLong;
		}
		for (; i < stepArrLength; i++) {
			if (stepArr[i] > len2) {
				continue;
			}
			
			stepSort(stepArr[i]);
		}
		
		// stepSort
		function stepSort(step) {
			
			var i = 0, 
			j = 0, 
			f, 
			tem, 
			key;
			var stepLen = len % step > 0 ? parseInt(len / step) + 1 : len / step;
			
			for (; i < step; i++) { // Followed by cycling column
				
				for (j = 1; /*j < stepLen && */step * j + i < len; j++) { //In cycles per line per column
					tem = f = step * j + i;
					key = array[f];
					while ((tem -= step) >= 0) { // Followed up to find
						if (array[tem] > key) {
							array[tem + step] = array[tem];
						} else {
							break;
						}
					}
					
					array[tem + step] = key;
					
				}
			}
			
		}
		
		return array;
		
	}
};

///////////////////////////////////////////////

//Remove the elements in the array using index
Array.prototype.remove = function (dx) { // dx is index
	try {
		if (isNaN(dx) || dx > this.length) {
			return false;
		}
		for (var i = 0, n = 0; i < this.length; i++) {
			if (this[i] != this[dx]) {
				this[n++] = this[i];
			}
		}
		this.length -= 1;
	} catch (e) {
		
		throw new Error("Array.remove() is error.Error Message:" + e);
	}
};

//Get the index of the object within the array
Array.prototype.getIndexByValue = function (value) { //value is element to finding
	try {
		var index = -1;
		for (var i = 0; i < this.length; i++) {
			if (this[i] == value) {
				index = i;
				break;
			}
		}
	} catch (e) {
		throw new Error("Array.getIndexByValue() is error.Error Message:" + e);
	}
	finally{
		return index;
	}
};

///////////////////////////////function make_date(date_str)//////////////////
//   09/03/2011                                                            //
//   One String for input, Converted to time type object                   //
//   Input data as one array   mm/dd/YYYY                                  //
//   Return one time type object                                          //
////////////////////////////////////////////////////////////////////////////

function make_date(date_str) {
	
	try {
		
		var _my_date = new Date(); //The default time to current time NullPointerException
		if (date_str !== null && data_str !== "") {
			
			var _recu_date = date_str.split("/"); //Split string using '/'
			if (_recu_date.length === 3) {
				var _month = parseInt(_recu_date[2]);
				var _date = parseInt(_recu_date[0]) - 1;
				var _year = parseInt(_recu_date[1]);
				if (_month < 12 && _month > 0 && _date > 0 && _date < 31 && _year > 0) {
					_my_date = new Date(_recu_date[2], _recu_date[0] - 1, _recu_date[1]); //Convert array  to the date object
				}
			}
		}
		
	} catch (e) {
		
		throw new Error("Function make_date() Conversion error. Conversion " + date_str + " .Error Message:" + e);
		
	}
	finally{
		
		return _my_date;
		
	}
	
}

String.prototype.makeDate = function () {
	try {
		if (this === null || this === ""){
			throw new Error("Function String.makeDate() NullPointerException.");
		}
		var _my_date = new Date(); //The default time to current time
		var _recu_date = this.split("/"); //Split string using '/'
		if (_recu_date.length !== 3) {
			throw new Error("Function String.makeDate() Conversion error.Format must be MM/DD/YYYYY. Conversion " + this + " error");
		}
		_my_date = new Date(_recu_date[2], _recu_date[0] - 1, _recu_date[1]); //Convert array  to the date object
	} catch (e) {
		
		throw new Error("Function String.makeDate() Conversion error. Conversion " + this + " .Error Message:" + e);
		
	}
	finally{
		
		return _my_date;
		
	}
	
};

//////////////////function toFormatStr(FormateTime)////////////////////////////
//   08/05/2011    suport year 01 - 9999                                     //
//   Conversion Object Date to String                                        //
//   return format string date like MM/DD/YYYY                               //
//   for year is 4 bit , month and day are 2 bit                             //
//   you can change format to DD/MM/YYYY or YYYY/MM/DD                       //
///////////////////////////////////////////////////////////////////////////////
Date.prototype.toFormatStr = function (FormateTime) {
	
	try {
		
		if (typeof(FormateTime) === "undefined" || FormateTime === null) {
			FormateTime = "MM/DD/YYYY";
		}
		
		if (FormateTime != "MM/DD/YYYY" && FormateTime != "DD/MM/YYYY" && FormateTime != "YYYY/MM/DD") {
			FormateTime = "MM/DD/YYYY";
		}
		
		var _datestr = this.getDate();
		var _monthstr = this.getMonth() + 1;
		var _yearstr = this.getUTCFullYear() + "";
		if (_datestr < 10) {
			_datestr = "0" + _datestr;
		}
		if (_monthstr < 10) {
			_monthstr = "0" + _monthstr;
		}
		
		FormateTime = FormateTime.replace("MM", _monthstr);
		FormateTime = FormateTime.replace("DD", _datestr);
		FormateTime = FormateTime.replace("YYYY", _yearstr);
		
	} catch (e) {
		
		throw new Error("Please check function Date.prototype.toFormatStr() input value. input is " + FormateTime + " .Error Message:" + e);
		
	}
	finally{
		
		return FormateTime;
		
	}
	
};
//////////////////function addDays(days)//////////////////////////////////
//   26/05/2011                                                              //
//   Extension method addMonths for Date()                                   //
///////////////////////////////////////////////////////////////////////////////
Date.prototype.addDays = function (days) {
	try {
		if (isNaN(days)) {
			days = 0;
		}
		this.setDate(this.getDate() + days);
	} catch (e) {
		throw Error("Date.addDays(" + days + ".Error:" + e);
	}
}
//////////////////function addMonths(Months)//////////////////////////////////
//   26/05/2011                                                              //
//   Extension method addMonths for Date()                                   //
///////////////////////////////////////////////////////////////////////////////
Date.prototype.addMonths = function (Months) {
	try {
		if (isNaN(Months)) {
			Months = 0;
		}
		this.setMonth(this.getMonth()() + Months);
	} catch (e) {
		throw Error("Date.addDays(" + Months + ".Error:" + e);
	}
}
//------------------------------------------------function make_date() end-----------------------------------------	


//////////////////function FindInArray(_arr,_obj)//////////////////////////////
//   18/03/2011                                                              //
//   Find one obj in the array                                               //
//   Just return first object                                                //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////


function FindInArray(_arr, _obj) {
	
	try {
		
		var _return_obj = "";
		
		for (var i = 0; i < _arr.length; i++) {
			
			if (arr[i] === obj) {
				
				if (_num === 0) {
					_return_obj = _obj;
					
					break;
				}
				
			}
			
		}
		
	} catch (e) {
		
		throw new Error("Please check function FindInArray().Inout is " + _arr.toString() + " Error Message:" + e);
		
	}
	finally{
		
		return _return_obj;
		
	}
	
}

Array.prototype.findObj = function (_obj) {
	
	try {
		
		var _return_obj = "";
		
		for (var i = 0; i < this.length; i++) {
			
			if (this[i] === obj) {
				
				if (_num === 0) {
					_return_obj = _obj;
					
					break;
				}
				
			}
			
		}
		
	} catch (e) {
		
		throw new Error("Please check function Array.findObj().Error Message:" + e);
		
	}
	finally{
		
		return _return_obj;
		
	}
	
};
//------------------------------------------------function FindPStringInArray() end-----------------------------------------


//////////////////function FindPStringInArray(_arr,_type)//////////////////////
//   20/03/2011                                                               //
//   Find the value of the type developed in the array                        //
//   return find the first result                                             //
//   Array input like  'type=value,type=value,type=value ......'              // 
//                                                                            //
///////////////////////////////////////////////////////////////////////////////


function FindPStringInArray(_arr, _type) {
	
	try {
		
		var _return_value = "";
		if (_arr !== null && _arr.length !== 0 && _type != null && _type !== "") {
			
			for (i = 0; i < _arr.length; i++) {
				
				var _temp_str = _arr[i];
				var _Start_point = _temp_str.search(_type);
				
				if (_Start_point !== -1) {
					
					_return_value = _temp_str.substring(_temp_str.indexOf("=", _Start_point) + 1, _temp_str.length);
					
				}
				
			}
			
		}
		
	} catch (e) {
		
		throw new Error("Please check function FindPStringInArray().Input is " + _arr.toString() + " Error Message:" + e);
		
	}
	finally{
		
		return _return_value;
		
	}
	
}

Array.prototype.FindParmStr = function (_type) {
	
	try {
		
		var _return_value = "";
		if (this !== null && this.length !== 0 && _type != null && _type !== "") {
			
			for (i = 0; i < this.length; i++) {
				
				var _temp_str = this[i];
				var _Start_point = _temp_str.search(_type);
				
				if (_Start_point !== -1) {
					
					_return_value = _temp_str.substring(_temp_str.indexOf("=", _Start_point) + 1, _temp_str.length);
					
				}
				
			}
			
		}
		
	} catch (e) {
		
		throw new Error("Please check Array.FindParmStr(). Error Message:" + e);
		
	}
	finally{
		
		return _return_value;
		
	}
	
};

//------------------------------------------------function FindPStringInArray() end-----------------------------------------


//////////////////function FindValueInString(_str,_type)////////////////////////
//   23/03/2011                                                               //
//   Find one Type Value in the Value String                                  //
//   Just return first Value String                                           //
//   For using searching Parmater String,every object like 'type=value'       // 
//   String input like  'type=value,type=value,type=value ......'             //
///////////////////////////////////////////////////////////////////////////////


function FindValueInString(_str, _type) {
	
	try {
		
		var _return_value = "";
		_str = jQuery.trim(_str);
		if (_str !== null && _str.length !== 0 && _type != null && _type !== "") {
			
			var _Start_point = _str.search(_type);
			_return_value = _str.substring(_str.indexOf("=", _Start_point) + 1, _str.length);
			
		}
		
	} catch (e) {
		
		throw new Error("Please check function FindPStringInArray().Input is " + _str + " Error Message:" + e);
		
	}
	finally{
		
		return _return_value;
		
	}
	
}

String.prototype.findValue = function (_type) {
	
	try {
		
		var _return_value = "";
		if (this !== null && this.length !== 0 && _type != null && _type !== "") {
			
			var _Start_point = this.search(_type);
			_return_value = this.substring(this.indexOf("=", _Start_point) + 1, this.length);
			
		}
		
	} catch (e) {
		
		throw new Error("Please check function String.findValue().Input is " + this + " Error Message:" + e);
		
	}
	finally{
		
		return _return_value;
		
	}
	
};

//------------------------------------------------function FindValueInString() end-----------------------------------------
//////////////////function FindValueInStringAndParmater(_str,_type,Splite_str)//
//   23/03/2011                                                               //
//   Find one Type Value in the Value String                                  //
//   Just return first Value String                                           //
//   For using searching Parmater String,every object like 'type=value'       // 
//   String input like  'type=value,type=value,type=value ......'             //
///////////////////////////////////////////////////////////////////////////////


function FindValueInStringAndParmater(_str, _type, Splite_str) {
	
	try {
		
		var _return_value = "";
		_str = jQuery.trim(_str);
		if (_str !== null && _str.length !== 0 && _type != null && _type !== "") {
			
			var _Start_point = _str.search(_type);
			_return_value = _str.substring(_str.indexOf(Splite_str, _Start_point) + 1, _str.length);
			
		}
		
	} catch (e) {
		
		throw new Error("Please check function FindPStringInArray().Input is " + _str + " Error Message:" + e);
		
	}
	finally{
		
		return _return_value;
		
	}
	
}

String.prototype.FindValueAP = function (_type, Splite_str) {
	
	try {
		
		var _return_value = "";
		
		if (this !== null && this.length !== 0 && _type != null && _type !== "") {
			
			var _Start_point = this.search(_type);
			_return_value = this.substring(this.indexOf(Splite_str, _Start_point) + 1, this.length);
			
		}
		
	} catch (e) {
		
		throw new Error("Please check function String.FindValueAP().Input is " + this + " Error Message:" + e);
		
	}
	finally{
		
		return _return_value;
		
	}
	
};
//------------------------------------------------function FindValueInString() end-----------------------------------------


//////////////////Widget window/////////////////////////////////////////////////
//   03/04/2011                                                               //
//  Extended Widget window jquery.simplemodal.js                              //
//                                                                            //
//                                                                            // 
//                                                                            //
///////////////////////////////////////////////////////////////////////////////

//Extended Widget window
jQuery(function ($) {
		try {
			var OSX = {
				container : null, 
				init : function () {
					$("input.osx, a.osx").click(function (e) {
							e.preventDefault();
							
							$("#osx-modal-content").modal({ //Define the simplemoda of parameters 
									overlayId : 'osx-overlay', 
									containerId : 'osx-container', 
									closeHTML : null, 
									minHeight : 80, 
									opacity : 35, 
									position : ['0', ''], 
									overlayClose : true, 
									onOpen : OSX.open, 
									onClose : OSX.close, 
									autoResize : true
								});
						});
				}, 
				open : function (d) {
					var self = this;
					self.container = d.container[0];
					d.overlay.fadeIn('fast', function () {
							$("#osx-modal-content", self.container).show();
							var title = $("#osx-modal-title", self.container);
							title.show();
							d.container.slideDown('slow', function () {
									setTimeout(function () {
											var h = $("#osx-modal-data", self.container).height() + 
											title.height() + 
											20; // padding
											d.container.animate({
													height : h
												}, 100, function () {
													$("div.close", self.container).show();
													$("#osx-modal-data", self.container).show();
												});
										}, 200);
								});
						});
				}, 
				close : function (d) {
					var self = this; // this = SimpleModal object
					d.container.animate({
							top : "-" + (d.container.height() + 20) 
						}, 500, function () {
							self.close(); // or $.modal.close();
							location.reload();
						});
				}
			};
			
			OSX.init();
		} catch (e) {
			throw new Error("Widget window error .Error Message:" + e);
		}
		
	});

//////////////////Widget DIV////////////////////////////////////////////////////
//   30/04/2011                                                               //
//                                                                            //
//                                                                            // 
//                                                                            //
///////////////////////////////////////////////////////////////////////////////

jQuery.fn.floatdiv = function (location) {
	//ie6
	var isIE6 = false;
	if ($.browser.msie && $.browser.version == "6.0") {
		$("html").css("overflow-x", "auto").css("overflow-y", "hidden");
		isIE6 = true;
	};
	$("body").css({
			margin : "0px", 
			padding : "0 10px 0 10px", 
			border : "0px", 
			height : "100%", 
			overflow : "auto"
		});
	return this.each(function () {
			var loc; //postion 
			if (location == undefined || location.constructor == String) {
				switch (location) {
				case ("rightbottom"): //right bottom 
					loc = {
						right : "0px", 
						bottom : "0px"
					};
					break;
				case ("leftbottom"): //left bottom 
					loc = {
						left : "0px", 
						bottom : "0px"
					};
					break;
				case ("lefttop"): //left top 
					loc = {
						left : "0px", 
						top : "0px"
					};
					break;
				case ("righttop"): //right yop 
					loc = {
						right : "0px", 
						top : "0px"
					};
					break;
				case ("middle"): //center 
					var l = 0; //left 
					var t = 0; //top 
					var windowWidth, 
					windowHeight; //
					//
					if (self.innerHeight) {
						windowWidth = self.innerWidth;
						windowHeight = self.innerHeight;
					} else if (document.documentElement && document.documentElement.clientHeight) {
						windowWidth = document.documentElement.clientWidth;
						windowHeight = document.documentElement.clientHeight;
					} else if (document.body) {
						windowWidth = document.body.clientWidth;
						windowHeight = document.body.clientHeight;
					}
					l = windowWidth / 2 - $(this).width() / 2;
					t = windowHeight / 2 - $(this).height() / 2;
					loc = {
						left : l + "px", 
						top : t + "px"
					};
					break;
				default: //
					loc = {
						right : "0px", 
						bottom : "0px"
					};
					break;
				}
			} else {
				loc = location;
			}
			$(this).css("z-index", "9999").css(loc).css("position", "fixed");
			if (isIE6) {
				if (loc.right != undefined) {
					
					if ($(this).css("right") == null || $(this).css("right") == "") {
						$(this).css("right", "18px");
					}
				}
				$(this).css("position", "absolute");
			}
		});
};
//////////////////Widget DIV  END///////////////////////////////////////////////


//End Javascript function expansion
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////function init_page ////////////////////////////////////
//   05/03/2011                                                            //
//   Initialize the page data                                              //
//                                                                         //
//                                                                         //
////////////////////////////////////////////////////////////////////////////

function init_page() {
	
	try {
		$("#VersionInfo").html(VersionInfo);
		document.getElementById("cal").disabled = false;
		//Currency conversion initialization data read from the outside
		/*
		        $(".webToolMidBody").children().children().children().children().children().each(function () {
		
		        if ($(this).attr("tagName") === "INPUT") {
		        $(this).val("1");
		        var _input_id = $(this).attr("ID");
		        Convert_GetConvertionCC(_input_id.split("t")[2]);
		        setTimeout("readCurrencyConverter()", 3000);
		        }
		
		        }) ;
		        */
			
		
		//Read the data, construct data for each day of the initial optimization,Parameters for the  Html elements class
		
		SortCommand(".TRSELECT");
		initCommandSelect(".TRSELECT");
		ReadVolumesOptimizationresults("RawData");
		
		//Read the results of the first optimize data,the elements edt saved the results of the first optimize data
		var _curr_obj_num = 0;
		edt_arr = new Array($('.edt').length);
		
		$('.edt').each(//Traverse the elements edt
			function () {
				
				edt_arr[_curr_obj_num] = $(this).val(); //Get the current element value
				_curr_obj_num++;
				
			});
		
		// End Traverse the elements edt--------------------------------------------------------------------- 
		
		
	} catch (e) {
		
		throw new Error("Function init_page(),Please reload this page.Loading  page object is error.Error Message:" + e);
		
	}
	
	// set cur time
	var curTimes = new Date();
	var curTimes = ($('#from_date').val()).makeDate(); //use from time
	curTimes.setDate(curTimes.getDate() + 21);
	$('#to_date').val(curTimes.toFormatStr());

	///////////////Get selected date. Calculated starting
	$('#CP').click(function () {
			
			$("#detalils_mutlisation_div").fadeOut("slow"); //Close window
			$("#mutlisation_parmater_div").fadeIn("slow");
			$("#mutlisation_parmater_div").floatdiv("middle");
			
		});
	
	//--------------action click for object CP finish
	
	///////////////The results confirm and submit
	$('#confirm').click(function () {
			
			Close_Results();
			
		});
	
	//--------------action click for object confirm finish
	
	
	///////////////Turn off the display the results
	$('#close_MPD').click(function () {
			
			$("#mutlisation_parmater_div").fadeOut("slow");
			
		});
	
	//--------------action click for object Cancel finish
	
	
	//////////////////////Get selected date. Calculated starting//////////////////////////////////
	$('#cal').click(function (e) { //Use widgets window
			var _no_null = true; //Detection time
			/////////////date-pick check -------------------------		 
			$('.date-pick').each(//////////////////////////////////////
				
				function () { //check input time
					if ($(this).val() == null || jQuery.trim($(this).val()) == "") {
						
						_no_null = false;
						throw new Error("init_page().Please check input time,you must be input one  starting time and one finish time.");
						
					}
				} //////////////////////////////////////	  
			);
			/////////////date-pick check end-------------------------	
			
			
			/////get input time
			var _from_date = ($("#from_date").val()).makeDate();
			var _to_date = ($("#to_date").val()).makeDate();
			//--finish get time
			var _Time_difference = (_to_date.getTime() - _from_date.getTime()) / (60 * 60 * 24 * 1000);
			var _cur_date = new Date();
			var _cur_date = _from_date; //use from time
			var _CommandNum = $(".RawData").length - 1;
			var s = ".RawData:eq(" + _CommandNum + ")";
			var LastCommandTime = ((($(".RawData:eq(" + ($(".RawData").length - 1) + ")").val()).split('@'))[0]).makeDate();
			var FirstCommandTime = ((($(".RawData:eq(0)").val()).split('@'))[0]).makeDate();
			if ((LastCommandTime.getTime() - _from_date.getTime()) < 0 || (FirstCommandTime.getTime() - _from_date.getTime()) > 0) {
				$(".ErroMessage").html("This time there is no command available");
				throw new Error("Input time error.Action cancel.");
			}
			//---------(new Date()).toFormatStr()
			_Time_difference = parseInt(_Time_difference);
			if (_Time_difference < 0) {
				_no_null = false;
				
				$(".ErroMessage").html("Departure time must be less than the arrival time.");
				$("#from_date").val(_cur_date.toFormatStr());
				_cur_date.setDate(_cur_date.getDate() + 21);
				$("#to_date").val(_cur_date.toFormatStr());
				throw new Error("Input time error.Action cancel");
				
			}
			
			if (_Time_difference > 21) {
				//_no_null = false;
				
				$(".ErroMessage").html("Period must be less than 3 weeks.");
				_from_date = ($("#from_date").val()).makeDate();
				_from_date.setDate(_from_date.getDate() + 21);
				
				$("#to_date").val(_from_date.toFormatStr());
				throw new Error("Input time more than 3 weeks.Action cancel ");
				
			}
			$(".ErroMessage").html("");
			//----------
			
			if (_no_null) { //According to the time required to build the result set need to calculate
				try {
					
					var _from_arr = []; //Greater than the start time of the data
					var _to_arr = []; //Less than the start time of the data
					var _data_arr = [];
					
					//-----------
					for (var i = 0; i < edt_arr.length; i++) { //Get all the records meet the time conditions
						//var _edt_date = make_date((edt_arr[i].split("@"))[0]); //Convert Date object
						var _edt_date = ((edt_arr[i].split("@"))[0]).makeDate();
						if (Date.parse(_edt_date) >= Date.parse(_from_date) && Date.parse(_edt_date) <= Date.parse(_to_date)) {
							
							_data_arr.push(edt_arr[i]);
						}
						
						if (_from_date == _to_date) {
							
							_data_arr.push(edt_arr[i]);
						}
						
					}
					if (_data_arr.length === 0) {
						throw new Error("Get the conditions of optimization results error.NullPointerException ");
					}
					//-----------
					/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////					
					
					//Detection of selected elements. Construction of new results based on the results array
					
					$('.RawData').each(//Traverse the object RawData
						function () { //check input time
							//
							var thisval = $(this).val();
							var _time_str = $(this).val().split("@")[0];
							var _id = $(this).val().split("@")[3];
							var _data_str = _data_arr.toString();
							var _Price = parseInt($(this).val().split("@")[1]);
							var _Volume = parseInt($(this).val().split("@")[2]);
							if (isNaN(_Price)) {
								throw new Error("Reading command parameter is error(Price) .Error is " + _Price);
							}
							if (isNaN(_Volume)) {
								throw new _Volume("Reading command parameter is error(Volume) .Error is " + _Volume);
							}
							if ($(this).attr("checked") == true) { //reading command ID
								if (_data_str.search(_time_str) != -1) {
									
									select_command = select_command + "CID=" + _id + ",";
									Total_Price = Total_Price + _Price;
									Total_Volum = Total_Volum + _Volume;
									//break;
									
									
								}
								
							}
							
							// start if for check is checked
							if ($(this).attr("checked") == false && _data_arr.length > 0) { //If there are elements not selected, and the results array is not empty
								//Start while For checking same time in the results
								for (i = 0; i < _data_arr.length; i++) {
									
									while (_data_arr[i].search(_id) != -1) {
										
										_data_arr[i] = ""; //Empty the contents of deleted elements
										//_data_arr.remove(i);
										//Can not call any method ??
										//Using the splice method, there does not recognize the problem of conventional method string,Using the splice method, there does not recognize the string problem of the conventional method, it is just empty elements
									}
									
								}
							}
							// End if for check is checked
							var _temp_arr = [];
							for (var i = 0; i < _data_arr.length; i++) { //Empty the contents if the element is empty
								
								if (_data_arr[i].length > 3) {
									_temp_arr.push(_data_arr[i]);
								}
							}
							_data_arr = _temp_arr; //The results of the array to reconstruct the
						} //////////////////////////////////////
					);
					
					//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					//
					$(".mutlisation_parmater#Exworks_Values").val((Total_Price / Total_Volum).toFixed(2));
					
					/////
					$("#mutlisation_parmater_div").hide("slow"); //Close parameter display page
					//Start building output page
					
					//get the last command time
					var _MaxDateCommand = GetMaxData(ReadDateArryFromDR(_data_arr));
					var _MinDateCommand = GetMinData(ReadDateArryFromDR(_data_arr));
					//Construction of the first optimize data display page
					
					var _Total_Purchase_Value_Volume = CreatList("detalils_div", _data_arr); //
					//Shows the default Daily data
					if ($(".result").length === 0) {
						
						throw new Error("Function CreatList() creating Results tables fail.Error Message: No found results table.");
					}
					$("#detalils_div").append("<input id=\"cur_page\" type=\"hidden\" value=\"0\">");
					
					FeedPage("#ListTR", ".result", DefPageNum, 10);
					if (_Total_Purchase_Value_Volume === [] || _Total_Purchase_Value_Volume.length != 2) {
						throw new Error("Function CreatList() return value error.Error Message:" + e);
					}
					
					var _Total_Purchase_Value = _Total_Purchase_Value_Volume.FindParmStr("FinalPric");
					var _Total_Purchase_Volume = _Total_Purchase_Value_Volume.FindParmStr("TotalVolume");
					$("#detaliListTotal").append(_Total_Purchase_Value + "Ä");
					$("#chooseDateForm").val();
					
					if (_Total_Purchase_Value === 0 || _Total_Purchase_Volume === 0 || isNaN(_Total_Purchase_Value) || isNaN(_Total_Purchase_Volume)) {
						throw new Error("Get Function CreatList() return value error.Please check Function FindPStringInArray() return vale.Error Message:" + e);
					}
					var _Purchase_Values_per_m3 = (_Total_Purchase_Value / _Total_Purchase_Volume).toFixed(2);
					
					//Construction of the first optimize data display page end
					
					
					var _Results_calculation_arr = main_calculation(_data_arr); //Algorithm optimization data
					//Writing Command and Results
					$("#Storage_Results").val($("#Storage_Results").val() + _Results_calculation_arr.toString());
					if (select_command.length > 0) {
						
						if (select_command.substr(-1) === ",") {
							select_command = select_command.substring(0, select_command.length - 1);
						}
						$("#Storage_Results").val($("#Storage_Results").val() + "@" + select_command);
					}
					$("#Storage_Results").val($("#Storage_Results").val() + "@VB=" + _Total_Purchase_Value);
					
					document.getElementById("cal").disabled = true;
					
					if (Show_Results("detalils_mutlisation", _Results_calculation_arr, _Total_Purchase_Value, _from_date, _to_date, _MaxDateCommand, _MinDateCommand)) { //Output final optimization of data
						
						$(".Message#MutualisationResult").css("display", "block");
						e.preventDefault();
						
					} else {
						throw new Error("Function Show_Results() execute fail.Can not create resulte page.Paramter is div:detalils_mutlisation," + "_Results_calculation_arr:" + _Results_calculation_arr.toString() + ",_Total_Purchase_Value" + _Total_Purchase_Value + ",_from_date:" + _from_date + ",_to_date:" + _to_date + ",_MaxDateCommand:" + _MaxDateCommand);
					}
					//End building output page
				} catch (e) {
					
					throw new Error("init_page().Please check mutialisation date .Input date is error . Error Message:" + e);
					
				}
				
			}
			
			//get start and finish date end-----------------
		});
	//---------------the object cal  response action click end--------------------------------
	
	$("#vSnext").click(function () {
			
			FeedPage("#ListTR", ".result", DefPageNum, 10);
			
		});
	
	$("#vSprev").click(function () {
			
			FeedPage("#ListTR", ".result", DefPageNum - 2, 10);
			
		});
	
	$("#ToBooking").click(function () {
			
			try {
				
				var _to_date = $("#to_date").val();
				var _from_date = $("#from_date").val();
				var _Storage_Results = $("#Storage_Results").val();
				var _new_etd = $(".detalils_mutlisation#new_etd").val();
				if (_Storage_Results === null || _Storage_Results === "") {
					throw new Error("Action Save Results error.Please Reloading this page .Checking submit object.Error :#Storage_Results.");
				}
				_to_date.makeDate();
				_from_date.makeDate();
				_new_etd.makeDate();
				
				$.post('/Order/ConfirmMutualisation', {
						to_date : _to_date, 
						from_date : _from_date, 
						Storage_Results : _Storage_Results, 
						new_etd : _new_etd
					}, function (data) {
						
						if ((data.split(","))[0] == "sucess") {
							//alert("You submit condolidation ID is "+(data.split(","))[1] +" .");
						} else {
							alert(data);
							throw new Error("Submit data fail.Error Message:" + e);
						}
						
					});
			} catch (e) {
				
				throw new Error("Please check submit data.Error Message:" + e);
			}
			finally{
				
				setTimeout("$(\".simplemodal-close\").trigger(\"click\")", 500);
				//$(".simplemodal-close").trigger("click");
			}
			
		});
	
	$(".MutualisationAction").click(function () {
			
			var MutualisationActionId = jQuery(this).attr("id");
			var _html = jQuery(this).html();
			if (MutualisationActionId === "MutualisationBefore") {
				
				$(".Message").css("display", "none");
				$(".Message#detalils_div_list").css("display", "block");
			}
			if (MutualisationActionId === "MutualisationAfter") {
				
				$(".Message").css("display", "none");
				$(".Message#MutualisationDetalis").css("display", "block");
				
			}
			if (MutualisationActionId === "MutualisationResults") {
				
				$(".Message").css("display", "none");
				$(".Message#MutualisationResult").css("display", "block");
				
			}
			
		});
	$(".TRSELECT").click(function () {
			
			$(".TRSELECT").each(
				function () {
					$(this).css("background", "white");
				});
			$("#selectDateDiv").remove();
			var FirstDate = $(this).attr("ID");
			var LastDate = DateSelect(FirstDate);
			var _top = $(this).position().top;
			var _left = $(this).position().left;
			$("#tempTD").remove(); 
			$(this).append("<td id=tempTD><div id=selectDateDiv style=position:absolute;top:" + _top + ";background:#eee;left:" + _left + "cursor:pointer;	 onclick=replaceDate(" + FirstDate.makeDate().getTime() + "," + LastDate.makeDate().getTime() + ")><a href=#>Select</a></div></td>");
			
		});
	$("#SelectBotton").click(function () {
			var _status = false;
			
			if ($(this).html() === "NO") {
				$(this).html("ALL");
			} else {
				$(this).html("NO");
				_status = true;
			}
			SelectAllCommand(".RawData", _status);
			
		});
}

//------------function init_page() end-------------------------------------


//////////////////function main_calculation(_arr_input)////////////////////////
//   10/03/2011                                                              //
//   After completion of the calculation to obtain the data                  //
//   Input data as an array                                                  //
//   Return calculation, the result is a string                              //
///////////////////////////////////////////////////////////////////////////////
function main_calculation(_arr_input) {
	
	try {
		
		var _LCL_num = 0;
		var _20SD_num = 0;
		var _40SD_num = 0;
		var _40HQ_num = 0;
		var _LCL_volume = 0;
		var _20SD_volume = 0;
		var _40SD_volume = 0;
		var _40HQ_volume = 0;
		var _remainder = 0;
		var return_str = "";
		var return_arr = [];
		var total = "";
		var _Remaining_state = true;
		//check input 
		if (_arr_input === null || _arr_input.length === 0) {
			
			throw new Error("Function main_calculation:NullPointerException,Input parameters is not complete.");
			
		}
		
		//Calculate the total number
		// "jj/mm/aaaa@TYPE@volumes@values"    like   "29/03/2011@40SDS@176@14562"
		for (var i = 0; i < _arr_input.length; i++) { //Total number of statistics
			var _temp_str = _arr_input[i].split("@")[2];
			var _temp_num = 0;
			if (_temp_str !== null || jQuery.trim(_temp_str) !== "") {
				
				_temp_str = jQuery.trim(_temp_str);
				
				if (_temp_str.indexOf(',') !== -1 || _temp_str.indexOf('.') !== -1) {
					_temp_str.replace(",", ".");
					_temp_num = parseFloat(_temp_str);
					_temp_num = Math.floor(_temp_num) + 1;
				} else {
					_temp_num = parseInt(_temp_str);
				}
				total = parseInt(total + _temp_num);
				
			} else {
				
				throw new Error('Please check EDT data.Function main_calculation(),Cargo hold error: ' + _temp_str);
				
			}
			
		}
		
		// detected for the total number 
		if (total === 0 || isNaN(total)) {
			
			throw new Error('Please check EDT data.Function main_calculation().Cargo hold total number error: ' + total);
			
		}
		//Save the total number of volumes.
		return_arr.push("total=" + total);
		
		////////////////////////////////////////////////////////////////////
		//Calculate the appropriate cargo. Algorithms and logic           //
		////////////////////////////////////////////////////////////////////
		
		
		if (total >= _40HQ) { //Capacity greater than or equal one 40HQ
			//Calculate the number of 40HQ can be placed
			_40HQ_num = Math.floor(total / _40HQ);
			
			//Get the number of remaining
			_remainder = total % _40HQ;
			
			if (_remainder === 0) { //Full 40HQ. No residual
				//Save the total number of 40HQ
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = total; //Actual capacity
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the total volumes of 40HQ
			}
			
		} else { //contingent remainder, continue to calculate
			_remainder = total;
		}
		
		if (_remainder < _40HQ && _remainder > _40SD) { //Capacity greater 40SD and less 40HQ
			_40HQ_num = _40HQ_num + 1; //The remaining capacity is greater than the 40SD into the 40HQ,Plus a number of 40HQ
			_40HQ_volume = total; //Rewrite the total capacity of the 40HQ
			return_arr.push("40HQ_num=" + _40HQ_num); //Save the total number of 40HQ
			return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
		}
		
		if (_remainder === _40SD) { //Calcul the volumes equal the 40SD
			if (_40HQ_num > 0) {
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = _40HQ_num * _40HQ; //Calcul the volumes of the 40HQ
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
			}
			
			_40SD_num = _40SD_num + 1;
			return_arr.push("40SD_num=" + _40SD_num); //Save the number of 40SD
			return_arr.push("40SD_volume=" + _40SD); //Save the number of volumes into 40SD
		}
		
		if (_remainder < _40SD && _remainder > (_20SD + _LCL)) { //Capacity greater 20SD and less equal 40SQ
			if (_40HQ_num > 0) {
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = _40HQ_num * _40HQ; //Calcul the volumes of the 40HQ
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
			}
			
			_40SD_num = _40SD_num + 1; //Calcul the number of the 40HQ
			return_arr.push("40SD_num=" + _40SD_num); //Save the number of 40SD
			return_arr.push("40SD_volume=" + _remainder); //Save the number of volumes into 40SD
		}
		
		if (_remainder < (_20SD + _LCL) && _remainder > _20SD) {
			
			if (_40HQ_num > 0) {
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = _40HQ_num * _40HQ; //Calcul the volumes of the 40HQ
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
			}
			_20SD_num = _20SD_num + 1; //Calcul the number of the 20SD
			_LCL_num = _LCL_num + 1; //Calcul the number of the LCL
			return_arr.push("20SD_num=" + _20SD_num); //Save the number of 20SD
			return_arr.push("20SD_volume=" + _20SD); //Save the number of volumes into 20SD
			return_arr.push("LCL_num=" + _LCL_num); //Save the number of LCL
			return_arr.push("LCL_volume=" + (_remainder - _20SD)); //Save the number of volumes into LCL
		}
		
		if (_remainder === (_20SD + _LCL)) { //Calcul the volumes equal the 20SD add LCL
			if (_40HQ_num > 0) {
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = _40HQ_num * _40HQ; //Calcul the volumes of the 40HQ
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
			}
			
			_20SD_num = _20SD_num + 1; //Calcul the number of the 20SD
			_LCL_num = _LCL_num + 1; //Calcul the number of the LCL
			return_arr.push("20SD_num=" + _20SD_num); //Save the number of 20SD
			return_arr.push("20SD_volume=" + _20SD); //Save the number of volumes into 20SD
			return_arr.push("LCL_num=" + _LCL_num); //Save the number of LCL
			return_arr.push("LCL_volume=" + _LCL); //Save the number of volumes into LCL
		}
		
		if (_remainder === _20SD) { //Calcul the volumes equal the 20SD
			if (_40HQ_num > 0) {
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = _40HQ_num * _40HQ; //Calcul the volumes of the 40HQ
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
			}
			_20SD_num = _20SD_num + 1; //Calcul the number of the 20SD
			return_arr.push("20SD_num=" + _20SD_num); //Save the number of 20SD
			return_arr.push("20SD_volume=" + _20SD); //Save the number of volumes into 20SD
		}
		
		if (_remainder < _20SD && _remainder > _LCL && _remainder > 0 && _remainder !== _20SD) { //
			if (_40HQ_num > 0) {
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = _40HQ_num * _40HQ; //Calcul the volumes of the 40HQ
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
			}
			
			_20SD_num = _20SD_num + 1; //Calcul the number of the 20SD
			_LCL_num = _LCL_num;
			return_arr.push("20SD_num=" + _20SD_num); //Save the number of 20SD
			return_arr.push("20SD_volume=" + _remainder); //Save the number of volumes into 20SD
		}
		
		if (_remainder <= _LCL && _remainder > 0) {
			
			if (_40HQ_num > 0) {
				return_arr.push("40HQ_num=" + _40HQ_num);
				_40HQ_volume = _40HQ_num * _40HQ; //Calcul the volumes of the 40HQ
				return_arr.push("40HQ_volume=" + _40HQ_volume); //Save the number of volumes into 40HQ
			}
			_LCL_num = _LCL_num + 1; //Calcul the number of the LCL
			return_arr.push("LCL_num=" + _LCL_num); //Save the number of LCL
			return_arr.push("LCL_volume=" + _remainder); //Save the number of volumes into LCL
		}
		
	} catch (e) {
		
		throw new Error("Please check function main_calculation(). Error Message:" + e);
	}
	finally{
		
		return return_arr;
		
	}
	
}

//------------------------------------------------function main_calculation() end-----------------------------------------


//////////////////function Show_Results(_Results)//////////////////////////////////////
//   11/03/2011                                                                      //
//   Shows the data calculated                                                       //
//   Input data as String _class_name,Arry _Results_arr,Date _from_date _to_date     //
//                                                                                   //
//////////////////////////////////////////////////////////////////////////////////////

function Show_Results(_class_name, _Results_arr, _Total_Purchase_Value, _from_date, _to_date, _MaxDateCommand, _MinDateCommand) {
	
	try {
		
		var _LCL_num = 0;
		var _20SD_num = 0;
		var _40SD_num = 0;
		var _40HQ_num = 0;
		var _LCL_volume = 0;
		var _20SD_volume = 0;
		var _40SD_volume = 0;
		var _40HQ_volume = 0;
		var _total = 0;
		var _Final_price_40HQ = 0;
		var _Final_price_40SD = 0;
		var _Final_price_20SD = 0;
		var _Final_price_LCL = 0;
		var _Final_price = 0;
		var _Total_Fret_Buyer_40HQ = 0;
		var _Total_Fret_Buyer_40SD = 0;
		var _Total_Fret_Buyer_20SD = 0;
		var _Total_Fret_Buyer_LCL = 0;
		var _Customs_Rate = 0;
		var _Customs_Rate_40HQ_values = 0;
		var _Customs_Rate_40SD_values = 0;
		var _Customs_Rate_20SD_values = 0;
		var _Customs_Rate_LCL_values = 0;
		var _Total_Delivery_Charge_40HQ = 0;
		var _Total_Delivery_Charge_40SD = 0;
		var _Total_Delivery_Charge_20SD = 0;
		var _Total_Delivery_Charge_LCL = 0;
		var _Total_Delivery_Charge = 0;
		var _VAT_Rate = 0;
		var _TypeNum = "";
		var _parmater_arr = read_parmater();
		var _TypeTransport = 0;
		if ($("." + _class_name).length === 0) {
			throw new Error("Function Show_Results() NullPointerException.Html object can not be finded.");
		}
		if (_Results_arr === null || _Results_arr.length === 0) {
			throw new Error("Function Show_Results() NullPointerException.Mutualisation results can not be finded.");
		}
		if (_Total_Purchase_Value === null || _Total_Purchase_Value === "") {
			throw new Error("Function Show_Results() NullPointerException.Total PurchaseValue results can not be finded.");
		}
		if (_parmater_arr === null || _parmater_arr.length == 0) {
			
			throw new Error("Read parmater error.All of parmater is null");
		}
		if (_from_date === "" || _to_date === "" || _MaxDateCommand === "" || _MinDateCommand === "") {
			throw new Error("Function Show_Results() NullPointerException.Input parameters is not complete.");
		}
		
		var _parmater_str = _parmater_arr.toString();
		
		$(".transport").each(function () {
				if ($(this).attr('id') === _MinDateCommand) {
					if ($(this).val() === "Barge(3 days)") {
						_TypeTransport = -100;
					}
					if ($(this).val() === "Train(1 day)") {
						_TypeTransport = -80;
					}
				}
				
			});
		for (var i = 0; i < _Results_arr.length; i++) { //Read each item of data
			//According to the data types are shown
			var _valur_type = _Results_arr[i].split("=")[0];
			
			var _value = _Results_arr[i].split("=")[1];
			
			if (_valur_type === "total") {
				
				_total = _value;
			}
			
			if (_valur_type === "40HQ_num") {
				
				_40HQ_num = _value;
			}
			if (_valur_type === "40HQ_volume") {
				
				_40HQ_volume = _value;
			}
			//
			if (_valur_type === "40SD_num") {
				
				_40SD_num = _value;
			}
			if (_valur_type === "40SD_volume") {
				
				_40SD_volume = _value;
			}
			//
			if (_valur_type === "20SD_num") {
				
				_20SD_num = _value;
			}
			if (_valur_type === "20SD_volume") {
				
				_20SD_volume = _value;
			}
			//
			if (_valur_type === "LCL_num") {
				
				_LCL_num = _value;
			}
			if (_valur_type === "LCL_volume") {
				
				_LCL_volume = _value;
			}
			
		}
		// just for witer to page
		if (_40HQ_num !== 0 && _40HQ_volume !== 0) {
			_TypeNum = _TypeNum + _40HQ_num + "x40HQ(" + _40HQ_volume + "m3) ";
		}
		if (_40SD_num !== 0 && _40SD_volume !== 0) {
			_TypeNum = _TypeNum + _40SD_num + "x40SD(" + _40SD_volume + "m3) ";
		}
		if (_20SD_num !== 0 && _20SD_volume !== 0) {
			_TypeNum = _TypeNum + _20SD_num + "x20SD(" + _20SD_volume + "m3) ";
		}
		if (_LCL_num !== 0 && _LCL_volume !== 0) {
			_TypeNum = _TypeNum + _LCL_num + "xLCL(" + _LCL_volume + "m3) ";
		}
		//
		////////////////////////////////////////////////////////////////////////
		//      20/03/2011                                                    //
		//      Calculate data and display the final data                     //
		//                                                                    //
		////////////////////////////////////////////////////////////////////////
		$("." + _class_name).each(//Read object. Calculated using the parameters
			//////////////////////////////////////
			
			function () {
				
				$(this).attr("disabled", "disabled");
				//start write title
				
				if ($(this).attr('id') === "recu") {
					
					if (_LCL_num > 0) {
						
						$(this).prepend(" LCL:" + _LCL_num + "*" + _LCL_volume + "m3");
						
					}
					
					if (_20SD_num > 0) {
						
						$(this).prepend(" 20SD:" + _20SD_num + "*" + _20SD_volume + "m3");
					}
					
					if (_40SD_num > 0) {
						
						$(this).prepend(" 40SD:" + _40SD_num + "*" + _40SD_volume + "m3");
					}
					
					if (_40HQ_num > 0) {
						
						$(this).prepend(" 40HQ:" + _40HQ_num + "*" + _40HQ_volume + "m3");
					}
					
				}
				//end write title
				
				//FTDate
				
				if ($(this).attr('id') === "ToDate") {
					//$(this).val(_to_date.getDate() + "/" + (_to_date.getMonth() + 1) + "/" + _to_date.getFullYear());
					$(this).val(_MaxDateCommand);
					$(".detalils_mutlisation#new_etd").val(_MaxDateCommand);
					
				}
				
				//number of the cargo
				
				if ($(this).attr('id') === "40HQ") {
					
					$(this).val(_40HQ_num + " * 40HQ");
					
				}
				if ($(this).attr('id') === "40SD") {
					
					$(this).val(_40SD_num + " * 40SD");
					
				}
				if ($(this).attr('id') === "20SD") {
					
					$(this).val(_20SD_num + " * 20SD");
					
				}
				if ($(this).attr('id') === "LCL") {
					
					$(this).val(_LCL_num + " * LCL");
					
				}
				
				if ($(this).attr('id') === "Volume_40HQ") {
					
					$(this).val(_40HQ_volume + "m3");
					
				}
				if ($(this).attr('id') === "Volume_40SD") {
					
					$(this).val(_40SD_volume + "m3");
					
				}
				if ($(this).attr('id') === "Volume_20SD") {
					
					$(this).val(_20SD_volume + "m3");
					
				}
				if ($(this).attr('id') === "Volume_LCL") {
					
					$(this).val(_LCL_volume + "m3");
					
				}
				
				if ($(this).attr('id') === "Exworks_Values_40HQ") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
					_Final_price_40HQ = _value * _40HQ_volume;
					$(this).val(_Final_price_40HQ + "$");
					
				}
				if ($(this).attr('id') === "Exworks_Values_40SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
					_Final_price_40SD = _value * _40SD_volume;
					$(this).val(_Final_price_40SD + "$");
					
				}
				if ($(this).attr('id') === "Exworks_Values_20SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
					_Final_price_20SD = _value * _20SD_volume;
					$(this).val(_Final_price_20SD + "$");
					
				}
				if ($(this).attr('id') === "Exworks_Values_LCL") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
					_Final_price_LCL = _value * _LCL_volume;
					$(this).val(_Final_price_LCL + "$");
					
				}
				/*
				    //The first result of the calculation
				    if ($(this).attr('id') === "Total_Exworks_Values") {
				             
				    var _point = _parmater_str.search("Exworks_Values");
				    var _value = _parmater_str.substring(_parmater_str.indexOf("=", _point) + 1, _parmater_str.indexOf(",", _point));
				    _Final_price = _Final_price_40HQ + _Final_price_40SD + _Final_price_20SD + _Final_price_LCL;
				    $(this).val(_value * _total);
				             
				    }
				    */
				//
				
				//_Final_price_40HQ
				
				
				//Trucking_Costs
				
				
				if ($(this).attr('id') === "Trucking_Costs_40HQ") {
					
					//_value = parseInt(FindValueInString(_parmater_str, "Trucking_cost_40HQ"));
					_value = 0;
					if (_40HQ_num > 0) {
						_Final_price_40HQ = parseInt(_Final_price_40HQ + _value);
						$(this).val(_value + "$");
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Trucking_Costs_40SD") {
					
					//_value = parseInt(FindValueInString(_parmater_str, "Trucking_cost_40SD"));
					_value = 0;
					if (_40SD_num > 0) {
						_Final_price_40SD = parseInt(_Final_price_40SD + _value);
						$(this).val(_value + "$");
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Trucking_Costs_20SD") {
					
					//_value = parseInt(FindValueInString(_parmater_str, "Trucking_cost_20SD"));
					_value = 0;
					if (_20SD_num > 0) {
						_Final_price_20SD = parseInt(_Final_price_20SD + _value);
						$(this).val(_value + "$");
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Trucking_Costs_LCL") {
					
					$(this).val(0 + "$");
					
				}
				
				//
				
				//Stuffing_Charge
				if ($(this).attr('id') === "Stuffing_Charge_40HQ") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Stuffing_Charge"));
					if (_Final_price_40HQ > 0) {
						
						_Final_price_40HQ = _Final_price_40HQ + _value * _40HQ_volume;
						$(this).val(_value * _40HQ_volume + "$");
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Stuffing_Charge_40SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Stuffing_Charge"));
					if (_Final_price_40SD > 0) {
						
						_Final_price_40SD = _Final_price_40SD + _value * _40SD_volume;
						$(this).val(_value * _40SD_volume + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Stuffing_Charge_20SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Stuffing_Charge"));
					if (_Final_price_20SD > 0) {
						
						_Final_price_20SD = parseInt(_Final_price_20SD + _value * _20SD_volume);
						$(this).val(_value * _20SD_volume + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Stuffing_Charge_LCL") {
					
					$(this).val(0 + "$");
					
				}
				
				//ORC
				if ($(this).attr('id') === "ORC_40HQ") {
					
					_value = parseInt(FindValueInString(_parmater_str, "ORC_40HQ"));
					if (_Final_price_40HQ > 0) {
						
						//_Final_price_40HQ = _Final_price_40HQ + _value;
						//$(this).val(_value + "$");
						$(this).val(0 + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "ORC_40SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "ORC_40SD"));
					if (_Final_price_40SD > 0) {
						
						//_Final_price_40SD = _Final_price_40SD + _value;
						//$(this).val(_value + "$");
						$(this).val(0 + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "ORC_20SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "ORC_20SD"));
					if (_Final_price_20SD > 0) {
						
						//_Final_price_20SD = _Final_price_20SD + _value;
						//$(this).val(_value + "$");
						$(this).val(0 + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "ORC_LCL") {
					
					$(this).val(0 + "$");
					
				}
				
				//
				
				
				//Total_FOB_Cost
				if ($(this).attr('id') === "Total_FOB_Cost_40HQ") {
					
					$(this).val(_Final_price_40HQ + "$");
					
				}
				if ($(this).attr('id') === "Total_FOB_Cost_40SD") {
					
					$(this).val(_Final_price_40SD + "$");
					
				}
				if ($(this).attr('id') === "Total_FOB_Cost_20SD") {
					
					$(this).val(_Final_price_20SD + "$");
					
				}
				if ($(this).attr('id') === "Total_FOB_Cost_LCL") {
					
					$(this).val(_Final_price_LCL + "$");
					
				}
				
				//Trading_Margin
				if ($(this).attr('id') === "Trading_Margin_40HQ") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
					$(this).val(Math.round(_Final_price_40HQ * _value * 0.01) + "$");
					_Final_price_40HQ = _Final_price_40HQ + Math.round(_Final_price_40HQ * _value * 0.01);
					
				}
				if ($(this).attr('id') === "Trading_Margin_40SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
					$(this).val(Math.round(_Final_price_40SD * _value * 0.01) + "$");
					_Final_price_40SD = _Final_price_40SD + Math.round(_Final_price_40SD * _value * 0.01);
					
				}
				if ($(this).attr('id') === "Trading_Margin_20SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
					$(this).val(Math.round(_Final_price_20SD * _value * 0.01) + "$");
					_Final_price_20SD = _Final_price_20SD + Math.round(_Final_price_20SD * _value * 0.01);
					
				}
				if ($(this).attr('id') === "Trading_Margin_LCL") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
					$(this).val(Math.round(_Final_price_LCL * _value * 0.01) + "$");
					_Final_price_LCL = _Final_price_LCL + Math.round(_Final_price_LCL * _value * 0.01);
					
				}
				//
				
				//FOB_Trading_Cost
				if ($(this).attr('id') === "FOB_Trading_Cost_40HQ") {
					
					$(this).val(_Final_price_40HQ + "$");
					
				}
				if ($(this).attr('id') === "FOB_Trading_Cost_40SD") {
					
					$(this).val(_Final_price_40SD + "$");
					
				}
				if ($(this).attr('id') === "FOB_Trading_Cost_20SD") {
					
					$(this).val(_Final_price_20SD + "$");
					
				}
				if ($(this).attr('id') === "FOB_Trading_Cost_LCL") {
					
					$(this).val(_Final_price_LCL + "$");
					
				}
				//
				
				//Cd_Fees
				if ($(this).attr('id') === "Cd_Fees_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
						_Total_Fret_Buyer_40HQ = _Total_Fret_Buyer_40HQ + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Cd_Fees_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
						_Total_Fret_Buyer_40SD = _Total_Fret_Buyer_40SD + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Cd_Fees_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
						_Total_Fret_Buyer_20SD = _Total_Fret_Buyer_20SD + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Cd_Fees_LCL") {
					
					if (_Final_price_LCL > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
						_Total_Fret_Buyer_LCL = _Total_Fret_Buyer_LCL + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				//
				
				
				//Handing_Fees			
				if ($(this).attr('id') === "Handing_Fees_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
						_Total_Fret_Buyer_40HQ = _Total_Fret_Buyer_40HQ + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Handing_Fees_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
						_Total_Fret_Buyer_40SD = _Total_Fret_Buyer_40SD + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Handing_Fees_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
						_Total_Fret_Buyer_20SD = _Total_Fret_Buyer_20SD + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Handing_Fees_LCL") {
					
					if (_Final_price_LCL > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
						_Total_Fret_Buyer_LCL = _Total_Fret_Buyer_LCL + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				//
				
				
				//Net_Loss_For_Consolidation
				if ($(this).attr('id') === "Net_Loss_For_Consolidation_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
						_Total_Fret_Buyer_40HQ = _Total_Fret_Buyer_40HQ + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Net_Loss_For_Consolidation_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
						_Total_Fret_Buyer_40SD = _Total_Fret_Buyer_40SD + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Net_Loss_For_Consolidation_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
						_Total_Fret_Buyer_20SD = _Total_Fret_Buyer_20SD + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				
				if ($(this).attr('id') === "Net_Loss_For_Consolidation_LCL") {
					
					if (_Final_price_LCL > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
						_Total_Fret_Buyer_LCL = _Total_Fret_Buyer_LCL + _value;
						$(this).val(_value + "$");
						
					} else {
						$(this).val(0 + "$");
					}
					
				}
				//
				
				//Fret_Rate_20SD
				
				if ($(this).attr('id') === "Fret_Rate_40HQ") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Fret_Rate_40HQ"));
					if (_Final_price_40HQ > 0) {
						
						_Total_Fret_Buyer_40HQ = _Total_Fret_Buyer_40HQ + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Fret_Rate_40SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Fret_Rate_40SD"));
					if (_Final_price_40SD > 0) {
						
						_Total_Fret_Buyer_40SD = _Total_Fret_Buyer_40SD + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
				}
				if ($(this).attr('id') === "Fret_Rate_20SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Fret_Rate_20SD"));
					if (_Final_price_20SD > 0) {
						
						_Total_Fret_Buyer_20SD = _Total_Fret_Buyer_20SD + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "Fret_Rate_LCL") {
					
					$(this).val(0 + "$");
					
				}
				//
				
				
				//BAF_20SD
				
				
				if ($(this).attr('id') === "BAF_40HQ") {
					
					_value = parseInt(FindValueInString(_parmater_str, "BAF_40HQ"));
					if (_Final_price_40HQ > 0) {
						
						_Total_Fret_Buyer_40HQ = _Total_Fret_Buyer_40HQ + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "BAF_40SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "BAF_40SD"));
					if (_Final_price_40SD > 0) {
						
						_Total_Fret_Buyer_40SD = _Total_Fret_Buyer_40SD + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "BAF_20SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "BAF_20SD"));
					if (_Final_price_20SD > 0) {
						
						_Total_Fret_Buyer_20SD = _Total_Fret_Buyer_20SD + _value;
						
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "BAF_LCL") {
					
					$(this).val(0 + "$");
					
				}
				
				//
				
				//CAF_20SD
				
				if ($(this).attr('id') === "CAF_40HQ") {
					
					_value = parseInt(FindValueInString(_parmater_str, "CAF_40HQ"));
					if (_Final_price_40HQ > 0) {
						
						_Total_Fret_Buyer_40HQ = _Total_Fret_Buyer_40HQ + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "CAF_40SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "CAF_40SD"));
					if (_Final_price_40SD > 0) {
						
						_Total_Fret_Buyer_40SD = _Total_Fret_Buyer_40SD + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "CAF_20SD") {
					
					_value = parseInt(FindValueInString(_parmater_str, "CAF_20SD"));
					if (_Final_price_20SD > 0) {
						
						_Total_Fret_Buyer_20SD = _Total_Fret_Buyer_20SD + _value;
						$(this).val(_value + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				if ($(this).attr('id') === "CAF_LCL") {
					
					$(this).val(0 + "$");
					
				}
				
				//
				
				//Fret_Buyer
				if ($(this).attr('id') === "Fret_Buyer_40HQ") {
					
					$(this).val(0 + "$");
					
				}
				if ($(this).attr('id') === "Fret_Buyer_40SD") {
					
					$(this).val(0 + "$");
					
				}
				if ($(this).attr('id') === "Fret_Buyer_20SD") {
					
					$(this).val(0 + "$");
					
				}
				if ($(this).attr('id') === "Fret_Buyer_LCL") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Fret_Buyer"));
					if (_Final_price_LCL > 0) {
						
						_Total_Fret_Buyer_LCL = _Total_Fret_Buyer_LCL + _value * _LCL_volume;
						$(this).val(_value * _LCL_volume + "$");
					} else {
						
						$(this).val(0 + "$");
					}
					
				}
				
				//Total_Fret_Buyer
				
				if ($(this).attr('id') === "Total_Fret_Buyer_40HQ") {
					
					$(this).val(_Total_Fret_Buyer_40HQ + "$");
					
				}
				if ($(this).attr('id') === "Total_Fret_Buyer_40SD") {
					
					$(this).val(_Total_Fret_Buyer_40SD + "$");
					
				}
				if ($(this).attr('id') === "Total_Fret_Buyer_20SD") {
					
					$(this).val(_Total_Fret_Buyer_20SD + "$");
					
				}
				if ($(this).attr('id') === "Total_Fret_Buyer_LCL") {
					
					$(this).val(_Total_Fret_Buyer_LCL + "$");
					
				}
				
				//CF_Values
				if ($(this).attr('id') === "CF_Values_40HQ") {
					
					_Final_price_40HQ = _Final_price_40HQ + _Total_Fret_Buyer_40HQ;
					$(this).val(_Final_price_40HQ + "$");
					
				}
				if ($(this).attr('id') === "CF_Values_40SD") {
					
					_Final_price_40SD = _Final_price_40SD + _Total_Fret_Buyer_40SD;
					$(this).val(_Final_price_40SD + "$");
					
				}
				if ($(this).attr('id') === "CF_Values_20SD") {
					
					_Final_price_20SD = _Final_price_20SD + _Total_Fret_Buyer_20SD;
					$(this).val(_Final_price_20SD + "$");
					
				}
				if ($(this).attr('id') === "CF_Values_LCL") {
					
					_Final_price_LCL = _Final_price_LCL + _Total_Fret_Buyer_LCL;
					$(this).val(_Final_price_LCL + "$");
					
				}
				//
				
				
				//Change_Rate_UE
				if ($(this).attr('id') === "Change_Rate_UE") {
					
					Change_Rate_UE = parseFloat(FindValueInString(_parmater_str, "Change_Rate_UE"));
					$(this).val(Change_Rate_UE);
					
				}
				
				//Change_Rate_UE
				if ($(this).attr('id') === "CF_Values_Euro_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_Final_price_40HQ = Math.round(_Final_price_40HQ * Change_Rate_UE);
						$(this).val(_Final_price_40HQ + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "CF_Values_Euro_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_Final_price_40SD = Math.round(_Final_price_40SD * Change_Rate_UE);
						$(this).val(_Final_price_40SD + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "CF_Values_Euro_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_Final_price_20SD = Math.round(_Final_price_20SD * Change_Rate_UE);
						$(this).val(_Final_price_20SD + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "CF_Values_Euro_LCL") {
					
					if (_Final_price_LCL > 0) {
						_Final_price_LCL = Math.round(_Final_price_LCL * Change_Rate_UE);
						$(this).val(_Final_price_LCL + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				
				//Customs_Rate
				
				if ($(this).attr('id') === "Customs_Rate_40HQ") {
					
					_Customs_Rate = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
					if (_Final_price_40HQ > 0) {
						
						_Customs_Rate_40HQ_values = Math.round(_Final_price_40HQ * _Customs_Rate * 0.01);
						_Final_price_40HQ = _Final_price_40HQ + _Customs_Rate_40HQ_values;
						$(this).val(_Customs_Rate_40HQ_values + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Customs_Rate_40SD") {
					
					_Customs_Rate = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
					if (_Final_price_40SD > 0) {
						
						_Customs_Rate_40SD_values = Math.round(_Final_price_40SD * _Customs_Rate * 0.01);
						_Final_price_40SD = _Final_price_40SD + _Customs_Rate_40SD_values;
						$(this).val(_Customs_Rate_40SD_values + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Customs_Rate_20SD") {
					
					_Customs_Rate = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
					if (_Final_price_20SD > 0) {
						
						_Customs_Rate_20SD_values = Math.round(_Final_price_20SD * _Customs_Rate * 0.01);
						_Final_price_20SD = _Final_price_20SD + _Customs_Rate_20SD_values;
						$(this).val(_Customs_Rate_20SD_values + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Customs_Rate_LCL") {
					
					_Customs_Rate = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
					if (_Final_price_LCL > 0) {
						
						_Customs_Rate_LCL_values = Math.round(_Final_price_LCL * _Customs_Rate * 0.01);
						_Final_price_LCL = _Final_price_LCL + _Customs_Rate_LCL_values;
						$(this).val(_Customs_Rate_LCL_values + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				
				//VAT_Assisi
				
				if ($(this).attr('id') === "VAT_Assisi_40HQ") {
					
					$(this).val(_Final_price_40HQ + "Ä");
					
				}
				if ($(this).attr('id') === "VAT_Assisi_40SD") {
					
					$(this).val(_Final_price_40SD + "Ä");
					
				}
				if ($(this).attr('id') === "VAT_Assisi_20SD") {
					
					$(this).val(_Final_price_20SD + "Ä");
					
				}
				if ($(this).attr('id') === "VAT_Assisi_LCL") {
					
					$(this).val(_Final_price_LCL + "Ä");
					
				}
				
				//VAT_Rate
				/*
				    if ($(this).attr('id') === "VAT_Rate") {
				             
				    //var _point = _parmater_str.search("VAT_Rate");
				    //var _value = _parmater_str.substring(_parmater_str.indexOf("=", _point) + 1, _parmater_str.indexOf(",", _point));
				    _VAT_Rate = parseFloat(FindValueInString(_parmater_str, "VAT_Rate"));
				             
				    $(this).val(_VAT_Rate);
				             
				    }
				    */
				//VAT
				_VAT_Rate = parseFloat(FindValueInString(_parmater_str, "VAT_Rate"));
				if ($(this).attr('id') === "VAT_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						$(this).val(parseInt(_Final_price_40HQ * _VAT_Rate * 0.01) + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "VAT_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						$(this).val(parseInt(_Final_price_40SD * _VAT_Rate * 0.01) + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "VAT_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						$(this).val(parseInt(_Final_price_20SD * _VAT_Rate * 0.01) + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "VAT_LCL") {
					
					if (_Final_price_20SD > 0) {
						
						$(this).val(parseInt(_Final_price_LCL * _VAT_Rate * 0.01) + "Ä");
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				
				//THC
				if ($(this).attr('id') === "THC_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "THC"));
						_Total_Delivery_Charge_40HQ = _Total_Delivery_Charge_40HQ + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "THC_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "THC"));
						_Total_Delivery_Charge_40SD = _Total_Delivery_Charge_40SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "THC_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "THC"));
						_Total_Delivery_Charge_20SD = _Total_Delivery_Charge_20SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "THC_LCL") {
					
					$(this).val(0 + "Ä");
					
				}
				
				//BL
				
				if ($(this).attr('id') === "BL_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "BL"));
						_Total_Delivery_Charge_40HQ = _Total_Delivery_Charge_40HQ + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "BL_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "BL"));
						_Total_Delivery_Charge_40SD = _Total_Delivery_Charge_40SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "BL_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "BL"));
						_Total_Delivery_Charge_20SD = _Total_Delivery_Charge_20SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "BL_LCL") {
					
					$(this).val(0 + "Ä");
					
				}
				//Duty_Paid
				
				if ($(this).attr('id') === "Duty_Paid_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Duty_Paid"));
						_Total_Delivery_Charge_40HQ = _Total_Delivery_Charge_40HQ + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Duty_Paid_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Duty_Paid"));
						_Total_Delivery_Charge_40SD = _Total_Delivery_Charge_40SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Duty_Paid_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Duty_Paid"));
						_Total_Delivery_Charge_20SD = _Total_Delivery_Charge_20SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Duty_Paid_LCL") {
					
					$(this).val(0 + "Ä");
					
				}
				
				//Customs_Clearance
				
				if ($(this).attr('id') === "Customs_Clearance_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Customs_Clearance"));
						_Total_Delivery_Charge_40HQ = _Total_Delivery_Charge_40HQ + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Customs_Clearance_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Customs_Clearance"));
						_Total_Delivery_Charge_40SD = _Total_Delivery_Charge_40SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Customs_Clearance_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Customs_Clearance"));
						_Total_Delivery_Charge_20SD = _Total_Delivery_Charge_20SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Customs_Clearance_LCL") {
					
					$(this).val(0 + "Ä");
					
				}
				
				//Inland_Haulage
				
				if ($(this).attr('id') === "Inland_Haulage_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Inland_Haulage"));
						_Total_Delivery_Charge_40HQ = _Total_Delivery_Charge_40HQ + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Inland_Haulage_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Inland_Haulage"));
						_Total_Delivery_Charge_40SD = _Total_Delivery_Charge_40SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Inland_Haulage_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Inland_Haulage"));
						_Total_Delivery_Charge_20SD = _Total_Delivery_Charge_20SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Inland_Haulage_LCL") {
					
					$(this).val(0 + "Ä");
					
				}
				
				//Fuel
				if ($(this).attr('id') === "Fuel") {
					
					_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
					_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
					$(this).val(_value + "Ä");
					
				}
				if ($(this).attr('id') === "Fuel_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
						_Total_Delivery_Charge_40HQ = _Total_Delivery_Charge_40HQ + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Fuel_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
						_Total_Delivery_Charge_40SD = _Total_Delivery_Charge_40SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Fuel_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
						_Total_Delivery_Charge_20SD = _Total_Delivery_Charge_20SD + _value;
						$(this).val(_value + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				if ($(this).attr('id') === "Fuel_LCL") {
					
					$(this).val(0 + "Ä");
					
				}
				
				//Delivery_Charge_LCL
				if ($(this).attr('id') === "Delivery_Charge_LCL") {
					
					if (_Final_price_LCL > 0) {
						
						_value = parseInt(FindValueInString(_parmater_str, "Delivery_Charge_LCL"));
						_Total_Delivery_Charge_LCL = _Total_Delivery_Charge_LCL + _value;
						$(this).val(_value * _LCL_volume + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
					
				}
				
				//_Total_Delivery_Charge
				if ($(this).attr('id') === "Total_Delivery_Charge_40HQ") {
					
					$(this).val(_Total_Delivery_Charge_40HQ + "Ä");
					
				}
				if ($(this).attr('id') === "Total_Delivery_Charge_40SD") {
					
					$(this).val(_Total_Delivery_Charge_40SD + "Ä");
					
				}
				if ($(this).attr('id') === "Total_Delivery_Charge_20SD") {
					
					$(this).val(_Total_Delivery_Charge_20SD + "Ä");
					
				}
				if ($(this).attr('id') === "Total_Delivery_Charge_LCL") {
					
					$(this).val(_Total_Delivery_Charge_LCL + "Ä");
					
				}
				
				//Value_DDP
				
				if ($(this).attr('id') === "Value_DDP_40HQ") {
					
					if (_Final_price_40HQ > 0) {
						
						_Final_price_40HQ = _Final_price_40HQ + _Total_Delivery_Charge_40HQ;
						$(this).val(_Final_price_40HQ + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
				}
				if ($(this).attr('id') === "Value_DDP_40SD") {
					
					if (_Final_price_40SD > 0) {
						
						_Final_price_40SD = _Final_price_40SD + _Total_Delivery_Charge_40SD;
						$(this).val(_Final_price_40SD + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
				}
				if ($(this).attr('id') === "Value_DDP_20SD") {
					
					if (_Final_price_20SD > 0) {
						
						_Final_price_20SD = _Final_price_20SD + _Total_Delivery_Charge_20SD;
						$(this).val(_Final_price_20SD + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
				}
				if ($(this).attr('id') === "Value_DDP_LCL") {
					
					if (_Final_price_LCL > 0) {
						
						_Final_price_LCL = _Final_price_LCL + _Total_Delivery_Charge_LCL;
						$(this).val(_Final_price_LCL + "Ä");
						
					} else {
						
						$(this).val(0 + "Ä");
					}
				}
				
				//Total_Volume
				if ($(this).attr('id') === "Total_Volume") {
					
					$(this).val(_total + "m3");
					
				}
				if ($(this).attr('id') === "TypeNum") {
					$(this).val(_TypeNum);
				}
				
				//Total_Purchase_Value
				if ((_Final_price_40HQ + _Final_price_40SD + _Final_price_20SD + _Final_price_LCL) > 0) {
					
					_Final_price = _Final_price_40HQ + _Final_price_40SD + _Final_price_20SD + _Final_price_LCL + _Total_Delivery_Charge;
				}
				if ($(this).attr('id') === "Total_Purchase_Value") {
					
					$(this).val(_Total_Purchase_Value + "Ä");
					
				}
				
				if ($(this).attr('id') === "Total_Value") {
					
					_Final_price = _Final_price + _TypeTransport;
					$(this).val(_Final_price + "Ä");
					$("#Storage_Results").val($("#Storage_Results").val() + "@VA=" + _Final_price);
					
				}
				
				//Purchase_Values_per_m3
				if ($(this).attr('id') === "Purchase_Values_per_m3") {
					_value = _Total_Purchase_Value / _total;
					_value = Math.round(_value * 100) / 100;
					$(this).val(_value + "Ä/m3");
					
				}
				if ($(this).attr('id') === "Values_per_m3") {
					_value = _Final_price / _total;
					_value = Math.round(_value * 100) / 100;
					$(this).val(_value + "Ä/m3");
					
				}
				
				//Gain
				if ($(this).attr('id') === "Gain") {
					
					_value = ((_Total_Purchase_Value - _Final_price) / _total).toFixed(2);
					$(this).val(_value + "Ä");
					
				}
				
				//Gain_pc
				if ($(this).attr('id') === "Gain_pc") {
					
					_value = (_value / (_Total_Purchase_Value / _total).toFixed(2)) * 100;
					_value = _value.toFixed(2);
					$(this).val(_value + "%");
					
				}
				
			} //-------------------------------------  
		);
		//Calculate data and display the final data is finished
		
		return true;
	} catch (e) {
		
		throw new Error("Please check function Show_Results(). Error Message:" + e);
		
	}
	
}

//------------------------------------------------function Show_Results() end-----------------------------------------


//////////////////function Close_Results()/////////////////////////////////////
//   11/03/2011                                                              //
//   Close the window and submit data to the server                          //
//                                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

function Close_Results() {
	
	try {
		
		//submit data to the server  
		
		
		$("#Show_Results").hide("slow"); //Close windows  
	} catch (e) {
		
		throw new Error("Please check function Close_Results(). Error Message:" + e);
		
	}
	
}

//------------------------------------------------function Close_Results() end-----------------------------------------


//////////////////function read_parmater()/////////////////////////////////////
//   17/03/2011                                                              //
//   read parmater for calcul                                                //
//                                                                           //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

function read_parmater() {
	
	try {
		
		var mp_arr = [];
		if ($('.mutlisation_parmater').length === 0) {
			throw new Error("Function read_parmater(),read parmater fail.Html object mutlisation_parmater can not be finded");
		}
		$('.mutlisation_parmater').each(//Traverse the elements edt
			//////////////////////////////////////
			function () {
				
				mp_arr.push($(this).attr('id') + "=" + ($(this).val()).replace(',', '.')); //Get the current element value,push into array,every object is name=value
			} //-------------------------------------  
		);
		
	} catch (e) {
		
		throw new Error("Please check function read_parmater(),read parmater fail. Error Message:" + e);
		
	}
	finally{
		
		return mp_arr;
	}
	
}






//////////////////function CreatList(div_id_str, _from_date, _to_date,_data_arr)///////////
//   25/03/2011                                                                          //
//   Find one Type Value in the Value String                                             //
//   Just return first Value String                                                      //
//   For using searching Parmater String,every object like 'type=value'                  // 
//   String input like  'type=value,type=value,type=value ......'                        //
//////////////////////////////////////////////////////////////////////////////////////////


function CreatList(div_id_str, _data_arr) {
	
	var _parmater_arr = read_parmater();
	
	if (_parmater_arr === null || _parmater_arr.length == 0) {
		
		throw new Error("Function CreatList().NullPointerException,read parmater error :function read_parmater()");
		return false;
	}
	if ($("#" + div_id_str).length === 0) {
		throw new Error("Function CreatList().NullPointerException,html object " + div_id_str + "is not finded");
		return false;
	}
	if (_data_arr === null || _data_arr.length === 0) {
		throw new Error("Function CreatList().NullPointerException,The results data object:" + _data_arr.toString() + "is not finded");
		return false;
	}
	var _parmater_str = _parmater_arr.toString();
	try {
		
		var _Final_pric = 0;
		var _total_volume = 0;
		var _cut_str = "</td></tr><tr><td align=\"center\">";
		var _insert_html = "";
		
		for (i = 0; i < _data_arr.length; i++) { //start create list
			var _date_str = (_data_arr[i].split("@"))[0];
			var _type = (_data_arr[i].split("@"))[1];
			var _volume = parseInt((_data_arr[i].split("@"))[2]);
			var _edt_date = make_date(_date_str);
			var _curr_price = 0;
			var _curr_pric = 0;
			var _curr_volume = 0;
			
			if (_volume > 0) {
				_total_volume = _total_volume + _volume;
			}
			var _insert_str = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td align=\"center\">";
			
			//_insert_str = _insert_str + "<tr><td>";
			_insert_str = _insert_str + _date_str + _cut_str;
			
			var _num = 0;
			
			if (_type === "40HQ" && _volume > 0) {
				
				if ((_volume % _40HQ) > 0) {
					_num = Math.floor(_volume / _40HQ) + 1;
				} else {
					_num = Math.floor(_volume / _40HQ);
				}
				
				_insert_str = _insert_str + _num + " * " + _type + _cut_str;
				
				_insert_str = _insert_str + _volume + "m3" + _cut_str;
				
				var _value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
				var _temp_value = 0;
				_curr_price = _value * _volume;
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Trucking_cost_40HQ"));
				_insert_str = _insert_str + _value + "$" + _cut_str;
				_curr_price = _curr_price + _value;
				
				_value = parseInt(FindValueInString(_parmater_str, "Stuffing_Charge"));
				//_temp_value = _value * _volume;
				//_curr_price = _curr_price + _temp_value;
				//_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "ORC_40HQ"));
				_curr_price = _curr_price + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				var _Total_Fret_Buyer = 0;
				
				_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fret_Rate_40HQ"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "BAF_40HQ"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "CAF_40HQ"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_insert_str = _insert_str + _Total_Fret_Buyer + _cut_str;
				
				_curr_price = _curr_price + _Total_Fret_Buyer;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "Change_Rate_UE"));
				//_insert_str = _insert_str + _value + _cut_str;
				
				_curr_price = Math.round(_curr_price * _value);
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "VAT_Rate"));
				_temp_value = parseInt(_curr_price * _value * 0.01);
				//_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				var _Total_Delivery_Charge = 0;
				_value = parseInt(FindValueInString(_parmater_str, "THC"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "BL"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Duty_Paid"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Clearance"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Inland_Haulage"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_insert_str = _insert_str + _Total_Delivery_Charge + "Ä" + _cut_str;
				
				_insert_str = _insert_str + "0" + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _Total_Delivery_Charge;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
			}
			
			if (_type === "40SD" && _volume > 0) {
				
				if ((_volume % _40SD) > 0) {
					_num = Math.floor(_volume / _40SD) + 1;
				} else {
					_num = Math.floor(_volume / _40SD);
				}
				
				_insert_str = _insert_str + _num + " * " + _type + _cut_str;
				
				_insert_str = _insert_str + _volume + "m3" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
				_curr_price = _value * _volume;
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Trucking_cost_40SD"));
				_curr_price = _curr_price + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Stuffing_Charge"));
				//_temp_value = _value * _volume;
				//_curr_price = _curr_price + _temp_value;
				//_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "ORC_40SD"));
				_curr_price = _curr_price + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_Total_Fret_Buyer = 0;
				
				_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fret_Rate_40SD"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "BAF_40SD"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "CAF_40SD"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_insert_str = _insert_str + _Total_Fret_Buyer + "$" + _cut_str;
				
				_curr_price = _curr_price + _Total_Fret_Buyer;
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "Change_Rate_UE"));
				//_insert_str = _insert_str + _value + _cut_str;
				
				_curr_price = Math.round(_curr_price * _value);
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "VAT_Rate"));
				_temp_value = parseInt(_curr_price * _value * 0.01);
				//_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_Total_Delivery_Charge = 0;
				_value = parseInt(FindValueInString(_parmater_str, "THC"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "BL"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Duty_Paid"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Clearance"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Inland_Haulage"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_insert_str = _insert_str + _Total_Delivery_Charge + "Ä" + _cut_str;
				
				_insert_str = _insert_str + "0" + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _Total_Delivery_Charge;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
			}
			
			if (_type === "20SD" && _volume > 0) {
				
				if ((_volume % _20SD) > 0) {
					_num = Math.floor(_volume / _20SD) + 1;
				} else {
					_num = Math.floor(_volume / _20SD);
				}
				
				_insert_str = _insert_str + _num + " * " + _type + _cut_str;
				
				_insert_str = _insert_str + _volume + "m3" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
				_curr_price = _value * _volume;
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Trucking_cost_20SD"));
				_curr_price = _curr_price + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Stuffing_Charge"));
				//_temp_value = _value * _volume;
				//_curr_price = _curr_price + _temp_value;
				//_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "ORC_20SD"));
				_curr_price = _curr_price + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + "" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_Total_Fret_Buyer = 0;
				
				_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fret_Rate_20SD"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "BAF_20SD"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "CAF_20SD"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_insert_str = _insert_str + _Total_Fret_Buyer + "$" + _cut_str;
				
				_curr_price = _curr_price + _Total_Fret_Buyer;
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "Change_Rate_UE"));
				//_insert_str = _insert_str + _value + _cut_str;
				
				_curr_price = Math.round(_curr_price * _value);
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "VAT_Rate"));
				_temp_value = parseInt(_curr_price * _value * 0.01);
				//_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_Total_Delivery_Charge = 0;
				_value = parseInt(FindValueInString(_parmater_str, "THC"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "BL"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Duty_Paid"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Clearance"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Inland_Haulage"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
				_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				_insert_str = _insert_str + _value + "Ä" + _cut_str;
				
				_insert_str = _insert_str + _Total_Delivery_Charge + "Ä" + _cut_str;
				
				_insert_str = _insert_str + "0" + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _Total_Delivery_Charge;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
			}
			
			if (_type === "LCL" && _volume > 0) {
				
				if ((_volume % _LCL) > 0) {
					_num = Math.floor(_volume / _LCL) + 1;
				} else {
					_num = Math.floor(_volume / _LCL);
				}
				
				_insert_str = _insert_str + _num + " * " + _type + _cut_str;
				
				_insert_str = _insert_str + _volume + "m3" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Exworks_Values"));
				_curr_price = _value * _volume;
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Stuffing_Charge"));
				_temp_value = _value * _volume;
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				//_insert_str = _insert_str + "0$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Trading_Margin"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_Total_Fret_Buyer = 0;
				
				//_value = parseInt(FindValueInString(_parmater_str, "Cd_Fees"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" +_cut_str;
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Handing_Fees"));
				_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				_insert_str = _insert_str + _value + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Net_Loss_For_Consolidation"));
				//_Total_Fret_Buyer = _Total_Fret_Buyer + _value;
				//_insert_str = _insert_str + _value + "$" + _cut_str;
				_insert_str = _insert_str + "0$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_insert_str = _insert_str + "0" + "$" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fret_Buyer"));
				_temp_value = _value * _volume;
				_Total_Fret_Buyer = _Total_Fret_Buyer + _temp_value;
				_insert_str = _insert_str + _temp_value + "$" + _cut_str;
				
				_insert_str = _insert_str + _Total_Fret_Buyer + "$" + _cut_str;
				
				_curr_price = _curr_price + _Total_Fret_Buyer;
				_insert_str = _insert_str + _curr_price + "$" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "Change_Rate_UE"));
				//_insert_str = _insert_str + _value + _cut_str;
				
				_curr_price = Math.round(_curr_price * _value);
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Rate"));
				_temp_value = Math.round(_curr_price * _value * 0.01);
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
				_value = parseFloat(FindValueInString(_parmater_str, "VAT_Rate"));
				_temp_value = parseInt(_curr_price * _value * 0.01);
				//_temp_value = _curr_price + _temp_value;
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_Total_Delivery_Charge = 0;
				_value = parseInt(FindValueInString(_parmater_str, "THC"));
				//_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				//_insert_str = _insert_str + _value + "Ä" + _cut_str;
				_insert_str = _insert_str + "0Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "BL"));
				//_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				//_insert_str = _insert_str + _value + "Ä" + _cut_str;
				_insert_str = _insert_str + "0Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Duty_Paid"));
				//_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				//_insert_str = _insert_str + _value + "Ä" + _cut_str;
				_insert_str = _insert_str + "0Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Customs_Clearance"));
				//_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				//_insert_str = _insert_str + _value + "Ä" + _cut_str;
				_insert_str = _insert_str + "0Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Inland_Haulage"));
				//_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				//_insert_str = _insert_str + _value + "Ä" + _cut_str;
				_insert_str = _insert_str + "0Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Fuel"));
				//_Total_Delivery_Charge = _Total_Delivery_Charge + _value;
				//_insert_str = _insert_str + _value + "Ä" + _cut_str;
				_insert_str = _insert_str + "0Ä" + _cut_str;
				
				_insert_str = _insert_str + _Total_Delivery_Charge + "Ä" + _cut_str;
				
				_value = parseInt(FindValueInString(_parmater_str, "Delivery_Charge_LCL"));
				_temp_value = _value * _volume;
				_insert_str = _insert_str + _temp_value + "Ä" + _cut_str;
				
				_curr_price = _curr_price + _temp_value;
				_insert_str = _insert_str + _curr_price + "Ä" + _cut_str;
				
			}
			_Final_pric = _Final_pric + _curr_price;
			_insert_str = _insert_str + "</td></tr></table>";
			
			$("#" + div_id_str).append("<div class=\"result\" id=\"result" + i + "\" >" + _insert_str + "</div>");
			
		}
		
		var return_arr = [];
		return_arr.push("FinalPric=" + _Final_pric);
		return_arr.push("TotalVolume=" + _total_volume);
		
		return return_arr;
	} catch (e) {
		throw new Error("Please check function CreatList().Error Message:" + e);
		return null;
	}
	
}







//////////////////function ReadVolumesOptimizationresults(_ObjectID)////////////
//   1/04/2011                                                                //
//   Read Volumes Optimization results for every day                          //
//   Just return true or false                                                //
//                                                                            // 
//   String input like  'type=value,type=value,type=value ......'             //
///////////////////////////////////////////////////////////////////////////////


function ReadVolumesOptimizationresults(_ObjectID) {
	try {
		
		if ($("." + _ObjectID).length === 0) {
			throw new Error("Please check function ReadVolumesOptimizationresults(), NullPointerException,input is null.Error Message:" + e);
		}
		var RawData = [];
		$("." + _ObjectID).each(//Traverse the elements 
			//////////////////////////////////////
			function () {
				
				var _ary_cal = [];
				var _Output_str = "";
				var _curr_value = $(this).val();
				var _date = _curr_value.split("@")[0];
				var _id = _curr_value.split("@")[3];
				//var _Optimizing_Data_str = "<input type=\"hidden\" class=\"edt\" value=\""+ _date + "@";
				_ary_cal.push(_curr_value);
				
				var _fin_recu_arr = main_calculation(_ary_cal);
				var _fin_recu_str = _fin_recu_arr.toString();
				
				var _40HQ_volume = FindPStringInArray(_fin_recu_arr, "40HQ_volume");
				var _40SD_volume = FindPStringInArray(_fin_recu_arr, "40SD_volume");
				var _20SD_volume = FindPStringInArray(_fin_recu_arr, "20SD_volume");
				var _LCL_volume = FindPStringInArray(_fin_recu_arr, "LCL_volume");
				if (_40HQ_volume.length > 0) {
					
					_Optimizing_Data_str = "<input type=\"hidden\" class=\"edt\" value=\"" + _date + "@40HQ@" + _40HQ_volume + "@" + _id + "\" />";
					$(this).parent().prev('td').prev('td').append(_Optimizing_Data_str);
					
				}
				if (_40SD_volume.length > 0) {
					
					_Optimizing_Data_str = "<input type=\"hidden\" class=\"edt\" value=\"" + _date + "@40SD@" + _40SD_volume + "@" + _id + "\" />";
					$(this).parent().prev('td').prev('td').append(_Optimizing_Data_str);
					
				}
				if (_20SD_volume.length > 0) {
					
					_Optimizing_Data_str = "<input type=\"hidden\" class=\"edt\" value=\"" + _date + "@20SD@" + _20SD_volume + "@" + _id + "\" />";
					$(this).parent().prev('td').prev('td').append(_Optimizing_Data_str);
					
				}
				if (_LCL_volume.length > 0) {
					
					_Optimizing_Data_str = "<input type=\"hidden\" class=\"edt\" value=\"" + _date + "@LCL@" + _LCL_volume + "@" + _id + "\" />";
					$(this).parent().prev('td').prev('td').append(_Optimizing_Data_str);
					
				}
				
				for (var i = 0; i < _fin_recu_arr.length; i++) { //Read each item of data
					//According to the data types are shown
					var _valur_type = _fin_recu_arr[i].split("=")[0];
					var _value = _fin_recu_arr[i].split("=")[1];
					//
					var _Optimizing_Data_str = "";
					if (_valur_type === "40HQ_num") {
						
						_Output_str = _Output_str + _value + "*40HQ ";
						//_Optimizing_Data_str =  "<input type=\"hidden\" class=\"edt\" value=\""+ _date + "@40HQ@" + _value +  "@000000\" />";
						
					}
					
					//
					if (_valur_type === "40SD_num") {
						
						_Output_str = _Output_str + _value + "*40SD ";
						//_Optimizing_Data_str =  "<input type=\"hidden\" class=\"edt\" value=\""+ _date + "@40SD@" + _value +  "@000000\" />";
						//_40SD_num = _value;
					}
					
					//
					if (_valur_type === "20SD_num") {
						
						_Output_str = _Output_str + _value + "*20SD ";
						//_Optimizing_Data_str =  "<input type=\"hidden\" class=\"edt\" value=\""+ _date + "@20SD@" + _value +  "@000000\" />";
						//_20SD_num = _value;
					}
					
					//
					
					if (_valur_type === "LCL_num") {
						
						_Output_str = _Output_str + _value + "*LCL ";
						//_Optimizing_Data_str =  "<input type=\"hidden\" class=\"edt\" value=\""+ _date + "@LCL@" + _value +  "@000000\" />";
						//_LCL_num = _value;
					}
					
				}
				
				$(this).parent().prev('td').prev('td').append(_Output_str);
				
			} //-------------------------------------  
		);
		
		return true;
		
	} catch (e) {
		
		throw new Error("Please check function ReadVolumesOptimizationresults().Error Message:" + e);
		return false;
		
	}
	finally{
		
		//return true;
	}
	
}






//////////////////////function readCurrencyConverter()///////////////////////
//   15/04/2011                                                            //
//   Read data from an external currency conversion                        //
//                                                                         //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function readCurrencyConverter() {
	
	try {
		var _html = $(".webToolMidBody").html();
		if (_html.length < 15) {
			throw new Error("Function readCurrencyConverter() read object CurrencyConverter error,Please check connection internet");
		}
		var _point1 = _html.lastIndexOf("1.00 USD = ") + 11;
		var _point2 = _html.lastIndexOf("EUR");
		if (!isNaN(parseFloat(_html.substring(_point1, _point2)))) {
			Change_Rate_UE = parseFloat(_html.substring(_point1, _point2));
		} else {
			Change_Rate_UE = 0.7;
		}
		$(".mutlisation_parmater#Change_Rate_UE").val(Change_Rate_UE);
	} catch (e) {
		Change_Rate_UE = 0.7;
		throw new Error("Function readCurrencyConverter(),Please check the Internet connection.Try to reload this page.Error Message:" + e);
	}
}







//////////////////////function FeedPage(ListObj, ResultObj, PageNumber, NumberPerPage)////
//   15/04/2011                                                                         //
//   FeedPage ListObj is using for write list page ,  ResultObj for put all of object   //
//   list number of page ,  NumberPerPage is every page nomber of                       // 
//   NumberPerPage is every page nomber of  the Result                                  //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
//FeedPage("#ListTR",".result",1,10)

function FeedPage(ListObj, ResultObj, PageNumber, NumberPerPage) {
	
	try {
		var _totalobj = $(ResultObj).length;
		PageNumber = parseInt(PageNumber);
		NumberPerPage = parseInt(NumberPerPage);
		var ResultObj_arr = [];
		if (_totalobj === 0 || $(ListObj).length === 0) {
			throw new Error("Function FeedPage().NullPointerException:No find object " + ListObj + " or " + ResultObj + " in the page.");
		}
		if (!isNaN() || !isNaN() || PageNumber > Math.ceil(_totalobj / NumberPerPage)) {
			
			PageNumber = 1;
			NumberPerPage = 10;
			DefPageNum = 1;
		}
		
		$(ResultObj).each(
			function () {
				
				ResultObj_arr.push(jQuery(this).html());
				
			});
		if (ResultObj_arr.length === 0) {
			throw new Error("Function FeedPage().NullPointerException:Read " + ResultObj + " fail.");
		}
		
		var index = PageNumber - 1;
		
		var TableHeader = $("#TableHeader").html();
		$(ListObj).html("");
		$(ListObj).append("<td id=\"TableHeader\">" + TableHeader + "</td>");
		var StartNum = 0;
		if (PageNumber > 0) {
			StartNum = index * NumberPerPage;
		}
		
		for (var i = 0; i < NumberPerPage; i++) {
			
			if (StartNum < ResultObj_arr.length) {
				
				$(ListObj).append("<td>" + ResultObj_arr[StartNum] + "</td>");
				
			} else {
				$(ListObj).append("<td width=\"60px\">&nbsp;</td>");
			}
			StartNum++;
			
		}
		DefPageNum++;
		return PageNumber;
	} catch (e) {
		throw new Error("Function FeedPage().Error Message:" + e);
	}
	
}





//////////////////////function CheckParmater()///////////////////////////////
//   04/05/2011                                                            //
//   Check input object                                                    //
//                                                                         //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function CheckParmater(ObjID) {
	var returnval = false;
	try {
		if ($(ObjID).length === 0) {
			throw new Error("Function CheckParmater().NullPointerException:object " + ObjID + " can not be find.");
		}
		var InputValue = $(ObjID).val();
		if (jQuery.trim(InputValue) !== "") {
			var num = PasInt(InputValue);
			if (isNaN(num)) {
				throw new Error("Function CheckParmater(). NumberException:object " + ObjID + " is not number type.");
			}
			returnval = true;
		}
		
	} catch (e) {
		throw new Error("Function CheckParmater().Error Message:" + e);
	}
	finally{
		return returnval;
	}
	
}




//////////////////////function GetMaxData()//////////////////////////////////
//   06/05/2011                                                            //
//   Get Max Date                                                          //
//   Input parameters are Array.                                           //
//   Each element of the array is like MM/DD/YYYY                          //
//   Return Max Date                                                       //
////////////////////////////////////////////////////////////////////////////
function GetMaxData(StrArrDate) {
	var _ReturnDate = (new Date()).toFormatStr();
	try {
		if (StrArrDate === null || StrArrDate.length === 0) {
			throw new Error("Function GetMaxData().NullPointerException:input is " + StrArrDate + " .");
		}
		var DateObj1 = StrArrDate[0].makeDate();
		var qs = DateObj1.toDateString();
		for (i = 1; i < StrArrDate.length; i++) {
			var DateObj2 = StrArrDate[i].makeDate();
			if (DateObj1 < DateObj2) {
				DateObj1 = DateObj2;
			}
			
		}
		
		var _monthstr = DateObj1.getMonth() + 1;
		var _daystr = DateObj1.getDate();
		var _yearstr = DateObj1.getFullYear();
		if (_monthstr < 10) {
			_monthstr = "0" + _monthstr;
		}
		if (_daystr < 10) {
			_daystr = "0" + _daystr;
		}
		_ReturnDate = DateObj1.toFormatStr();
		
	} catch (e) {
		throw new Error("Function CheckParmater().Error Message:" + e);
	}
	finally{
		return _ReturnDate;
	}
	
}




//////////////////////function GetMinData()//////////////////////////////////
//   25/05/2011                                                            //
//   Get Min Date                                                          //
//   Input parameters are Array.                                           //
//   Each element of the array is like MM/DD/YYYY                          //
//   Return Max Date                                                       //
////////////////////////////////////////////////////////////////////////////
function GetMinData(StrArrDate) {
	var _ReturnDate = (new Date()).toFormatStr();
	try {
		if (StrArrDate === null || StrArrDate.length === 0) {
			throw new Error("Function GetMinData().NullPointerException:input is " + StrArrDate + " .");
		}
		var DateObj1 = StrArrDate[0].makeDate();
		var qs = DateObj1.toDateString();
		for (i = 1; i < StrArrDate.length; i++) {
			var DateObj2 = StrArrDate[i].makeDate();
			if (DateObj1 > DateObj2) {
				DateObj1 = DateObj2;
			}
			
		}
		
		var _monthstr = DateObj1.getMonth() + 1;
		var _daystr = DateObj1.getDate();
		var _yearstr = DateObj1.getFullYear();
		if (_monthstr < 10) {
			_monthstr = "0" + _monthstr;
		}
		if (_daystr < 10) {
			_daystr = "0" + _daystr;
		}
		_ReturnDate = DateObj1.toFormatStr();
		
	} catch (e) {
		throw new Error("Function GetMinData().Error Message:" + e);
	}
	finally{
		return _ReturnDate;
	}
	
}




//////////////////////function ReadDateArryFromDR()//////////////////////////
//   06/05/2011                                                            //
//   Read every record for get the time for the record.                    //
//   Input Data command Array.                                             //
//   Each element of the time  is like MM/DD/YYYY                          //
//   Return Date in the string arry.                                       //
////////////////////////////////////////////////////////////////////////////

function ReadDateArryFromDR(DataArry) {
	var _ReturnArry = [];
	try {
		if (DataArry === null || DataArry.length === 0) {
			throw new Error("Function ReadDateArryFromDR().NullPointerException:input is " + DataArry + " .");
		}
		
		for (var i = 0; i < DataArry.length; i++) {
			
			var tempcommand = DataArry[i].split("@");
			var _TimeStr = tempcommand[0];
			//_TimeStr.makeDate();
			_ReturnArry.push(_TimeStr);
		}
		
	} catch (e) {
		_ReturnArry = [((new Date()).getMonth() + 1) + "/" + (new Date()).getDate() + "/" + (new Date()).getFullYear()];
		throw new Error("Function ReadDateArryFromDR().Error Message:" + e);
	}
	finally{
		return _ReturnArry;
	}
}




//////////////////////function SelectAllCommand()//////////////////////////
//   20/05/2011                                                            //
//   Select all and deselect all of the same name Checkbox                 //
//   @Parameters :  Object CheckBox class                                  //
//   @Parameters :  _status                                                //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function SelectAllCommand(_CheckBoxClass, _status) {
	
	try {
		if ($(_CheckBoxClass).length === 0) {
			throw new Error("Function SelectAllCommand().Can not finded this object " + _CheckBoxClass + " .");
		}
		
		var _type = $(_CheckBoxClass).attr("type");
		if (_type !== "checkbox") {
			throw new Error("Function SelectAllCommand().This object " + _CheckBoxClass + " type error .Type is " + _type);
		}
		
		$(_CheckBoxClass).each(function () {
				$(this).attr("checked", _status);
			});
	} catch (e) {
		throw new Error("Function SelectAllCommand() Parameters :" + _CheckBoxClass + " ." + e);
	}
	
}



//////////////////////function SortCommand()/////////////////////////////////
//   01/06/2011                                                            //
//   According to the selected command to determine the maximum time frame //
//   can be selected                                                       //
//   @Parameters :  Object command TR  class                               //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function DateSelect(ObjID) {
	
	var fromDate = ObjID;
	var ReturnDate = fromDate;
	var IntervalTime = 21;
	var prvObj;
	var staus = true;
	if (fromDate === null || fromDate === "") {
		fromDate = new Date();
	}
	fromDate = fromDate.makeDate();
	$(".TRSELECT").each(
		function () {
			try {
				
				var curDate = ($(this).attr("ID")).makeDate();
				var Difference = (fromDate.getTime() - curDate.getTime()) / (60 * 60 * 24 * 1000);
				//console.log(Difference);
				if (IntervalTime >= Difference && Difference >= 0) {
					$(this).css("background-color", "#88E1F4");
					prvObj = $(this).attr("ID");
					if (staus) {
						ReturnDate = prvObj;
						staus = false;
					}
				}
				
			} catch (e) {
				throw new Error("");
			}
			
		});
	return ReturnDate;
}



//////////////////////function SortCommand()/////////////////////////////////
//   01/06/2011                                                            //
//   Show distinguish the order every three weeks                          //
//   @Parameters :  Object command TR  class                               //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function initCommandSelect(_ObjCalss) {
	
	var _IntervalTime = 21;
	var _StartIDDate = $(_ObjCalss).last().attr("ID");
	var _firstin = true;
	var lastID;
	
	for (var _curObj = $(_ObjCalss).last();_curObj.length > 0 ;_curObj = _curObj.prev()){
		var _CurDate = (_curObj.attr("ID")).makeDate();
		var _StartDate = _StartIDDate.makeDate();
		var _Difference = (_StartDate.getTime() - _CurDate.getTime()) / (60 * 60 * 24 * 1000);
		if (_Difference >_IntervalTime){
			
			_curObj.children().css("border-bottom", "2px solid red");
			_StartIDDate = _curObj.attr("ID");
		}
		
	}
	
}




//////////////////////function SortCommand()/////////////////////////////////
//   30/05/2011                                                            //
//   Sort Command by Date                                                  //
//   @Parameters :  Object command TR  class                               //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function SortCommand(_ObjCalss) {
	var _command_arr = [];
	$(_ObjCalss).each(
		function () {
			try {
				_command_arr.push($(this).attr("ID").makeDate().getTime());
			} catch (e) {
				throw new Error("Function SortCommand() Error:" + e);
			}
		});
	
	try {
		if (_command_arr.length > 1) {
			var _command_str = _command_arr.toString();
			var _saveSortHtml = [];
			var _sortcommand = SortedArray.array['shellSort'](_command_arr);
			
			var _num_obj = 0;
			for (var i = 0; i < _sortcommand.length; i++) {
				var _cur_collection = new Date();
				_cur_collection.setTime(_sortcommand[i]);
				var _Date_str = _cur_collection.toFormatStr();
				_sortcommand[i] = _Date_str;
				$(_ObjCalss).each(
					function () {
						var _html = $(this).html();
						if ($(this).attr("ID") === _Date_str) {
							var insert = true;
							for (j = 0; j < _saveSortHtml.length; j++) {
								if (_saveSortHtml[j] === _html) {
									insert = false;
								}
							}
							if (insert) {
								_saveSortHtml.push(_html);
							}
							
						}
					});
			}
			
			//console.log("arry length is "+ _saveSortHtml.length);
			$(_ObjCalss).each(
				function () {
					$(this).attr("ID", _sortcommand[_num_obj]);
					$(this).html(_saveSortHtml[_num_obj]);
					_num_obj++;
				});
			
		}
	} catch (e) {
		throw new Error("Function SortCommand() sort Error:" + e);
	}
	
}





//////////////////////function replaceDate()/////////////////////////////////
//   30/05/2011                                                            //
//   Replace the selected time range                                       //
//   @Parameters :  Select the time range                                  //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function replaceDate(_toDate, _fromDate) {
	
	try {
		if (isNaN(_fromDate) || isNaN(_toDate)) {
			throw new Error("Function replaceDate error,replace from and to date error.error message: input value is not number.");
		}
		_fromDate = parseInt(_fromDate);
		_toDate = parseInt(_toDate);
		var fromObj = $(".date-pick#from_date");
		var toObj = $(".date-pick#to_date");
		if (fromObj.length === 0 || toObj.length === 0) {
			throw new Error("Function replaceDate error.error message: can not finded Object .");
		}
		//console.log(fromObj.val());
		var fromDate = new Date();
		fromDate.setTime(_fromDate);
		fromDate = fromDate.toFormatStr();
		//console.log(fromDate);
		var toDate = new Date();
		toDate.setTime(_toDate);
		toDate = toDate.toFormatStr();
		//console.log(toDate);
		fromObj.val(fromDate);
		toObj.val(toDate);
	} catch (e) {
		throw new Error("Function replaceDate error,replace from and to date error.error message :" + e);
	}
}


//////////////////////function PringCode2D()/////////////////////////////////
//   21/06/2011                                                            //
//   Print CODE 2D                                                         //
//   @Parameters : mutialisation ID                                        //
//                                                                         //
////////////////////////////////////////////////////////////////////////////
function PringCode2D(MID){
	try{
		if (MID === ""){
			throw new Error("Function PringCode2D error NullPointerException.Error message : input ID is null");
		}
		var OpenWindow = window.open ("/QRcode2D/CODE2D.html","CODE2D","height=400,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=0,location=no,status=no");
		OpenWindow.document.write("<table width=300 border=0 cellspacing=0 cellpadding=0><tr><td></td><td></td><td height=30 align=center valign=middle></td></tr><tr><td width=70 rowspan=2></td><td width=150 height=75 align=center valign=bottom><img id=TagIMG src=/QRcode2D/"+MID+".png width=200 height=200></td><td rowspan=2></td></tr><tr><td height=75 align=center valign=top><div id=TagID>"+MID+"</div></td></tr><tr><td></td><td height=70 align=center><a href=javascript:window.print();>Print</a><br/><a href=javascript:window.close();>Close</a></td><td></td></tr></table>");
		OpenWindow.focus();
		
	}
	catch (e) {
		throw new Error("Function PringCode2D error.Error message :" + e);
	}

}