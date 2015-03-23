;(function(window){
	function checkTime(num){
		var n = Number(num);
		if(n<10)n = "0"+n;
		return n;
	} 
	var Util = {
			trim:function(str) {
				if (typeof str !== "string") {
					return str;
				}
				if (typeof str.trim === "function") {
					return str.trim();
				} else {
					return str.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "");
				}
			},
			isEmpty:function(obj){
				if(obj === undefined){
					return true;
				}else if(obj==null){
					return true;
				}else if(typeof obj === "string"){
					if(this.trim(obj) == ""){
						return true;
					}
				}
				return false;
			},
			isNotEmpty:function(obj){
				return !this.isEmpty(obj);
			},
            escapeScript:function(str){
                if(typeof str !== "string" || this.isEmpty(str))return str;
                return str.replace(/\&/g,"&amp;").replace(/\</g,"&lt;");
            },
			currentTime:function(){
				return this.formatDate(new Date());
			},
			calcPercent:function(value, total){
				if(isNaN(value)||Number(value)==0)return "0";
				if(isNaN(total) || Number(total)==0)return "0";
				return Math.round(Number(value)*100/Number(total));
			},
			round:function(number,fractionDigits){
				fractionDigits = fractionDigits||2;
				with(Math){  
					return round(number*pow(10,fractionDigits))/pow(10,fractionDigits);  
				}  
			},
			timeDuration:function(second){
				if(!second || isNaN(second))return;
				second = parseInt(second);
				var time = '';
				var hour = second / 3600|0;
		        if (hour != 0) {
		        	time += checkTime(hour) + ':';
		        }
		        var min = (second % 3600) / 60|0;
		        time += checkTime(min) + ':';
		        var sec = (second - hour * 3600 - min * 60) |0;
		        time += checkTime(sec);
		        return time;
			},
			formatDate:function(date){
				var h = date.getHours();
				var m = date.getMinutes();
				var s = date.getSeconds();
				return checkTime(h)+":"+checkTime(m)+":"+checkTime(s);
			},
			formatTime:function(time){
				var date = new Date();
				date.setTime(time);
				var h = date.getHours();
				var m = date.getMinutes();
				var s = date.getSeconds();
				return checkTime(h)+":"+checkTime(m)+":"+checkTime(s);
			},
			formatText:function(text){
				text = text.replace(" ", "&nbsp;");
				text = text.replace(/\n/g, "<br/>");
				return text;
			},
            formatUrl:function(content){
                var reg = /(?:<img.+?>)|(http[s]?|(www\.)){1}[\w\.\/\?=%&@:#;\*\$\[\]\(\){}'"\-]+([0-9a-zA-Z\/#])+?/ig,
                    content = content.replace(reg, function(content) {
                        if(/<img.+?/ig.test(content)){
                            return content;
                        }else{
                            return '<a class="msg-url" target="_blank" href="'+content.replace(/^www\./,function(content){
                                return "http://" + content;
                            })+'">'+content+'</a>'
                        }

                    });
                return content;
            },
			replaceholder:function(str, values){
				return str.replace(/\{(\d+)\}/g, function(m, i) {
					return values[i];
				});
			},
			pasteHtmlAtCaret:function(html) {
			    var sel, range;
			    if (window.getSelection) {
			        // IE9 and non-IE
			        sel = window.getSelection();
			        if (sel.getRangeAt && sel.rangeCount) {
			            range = sel.getRangeAt(0);
			            range.deleteContents();

			            // Range.createContextualFragment() would be useful here but is
			            // non-standard and not supported in all browsers (IE9, for one)
			            var el = document.createElement("div");
			            el.innerHTML = html;
			            var frag = document.createDocumentFragment(), node, lastNode;
			            while ( (node = el.firstChild) ) {
			                lastNode = frag.appendChild(node);
			            }
			            range.insertNode(frag);

			            // Preserve the selection
			            if (lastNode) {
			                range = range.cloneRange();
			                range.setStartAfter(lastNode);
			                range.collapse(true);
			                sel.removeAllRanges();
			                sel.addRange(range);
			            }
			        }
			    } else if (document.selection && document.selection.type != "Control") {
			        // IE < 9
			        document.selection.createRange().pasteHTML(html);
			    }
			}
		};
	var i18n = function(key){
		return lang[key]||key;
	};
	window.Util = Util;
	window.i18n = i18n;
})(window);

var Channel = Channel||GS.createChannel("zhangjin");
$(function() {
	Channel.bind("onQAList", loadQaList);
	Channel.bind("onQA", loadQa);
})

function loadQaList(evt){
	var qalocal = $("#qa-list").find(".qa-local").clone();
	$("#qa-list ul").html("");
	$("#qa-list ul").append(qalocal);
	
	var qaList = evt.data;
	for(var i in qaList.list){
		loadQaUI(qaList.list[i]);
	}
}

function loadQa(evt){
	loadQaUI(evt.data);
}

function removeQa(evt){
	removeQaUI({id:evt.data.id});
}

function submitQa(){
	var content = $("#chat-area2").val();
	if(!User.nickname && !User.id) {
        User.nickname = $(".widget-viedo").children().attr('uname');
    }
	if(Util.isNotEmpty(content)){
		Channel.send("submitQuestion", {"content":content}, function(data){
			if(data&&data.result==false){
				if(data.data&&data.data.content){
					loadMinIntervalError2QaList({"content":data.data.content});
				}
			}
		});
		$("#chat-area2").val("");
		loadQaUI({id:"local",question:content,answer:"",submitor:User.nickname,submitTime:(new Date().getTime()/1000)});
	}
}

function loadMinIntervalError2QaList(msg){
	var sSysMsgEle = '<li class="warning-msg"><div>'
	+'<i class="msg-time">'
	+ (msg.time?Util.formatTime(msg.time*1000):Util.currentTime())
		+'</i> "'
		+msg.content
		+'" '
		+i18n("common.system.sendfail")
		+'('+i18n("qa.system.submittoooften")+')'
	+'</div></li>';

    $("#qa-list ul").scrollTo({
        fn:function(){
            $("#qa-list ul").append(sSysMsgEle);
        }
    });
}

function loadQaUI(qa){
    qa.answer = Util.escapeScript(qa.answer);
    qa.question = Util.escapeScript(qa.question);
    if(qa.id !== "local") {
    	var sQaEle = '';
    	if(Util.isNotEmpty(qa.answer)){
			sQaEle += getAElem(qa);
		}else{
			sQaEle += getQElem(qa);
		}
		$(".section-content").append(sQaEle);
		$(".section-content").animate({scrollTop:$(".section-content").prop("scrollHeight") - $(".section-content").height()}, 0);
    }
}

function getQElem(qa){
	var sQElem = '<div class="talk-box qa-' + qa.id + '">'
		+ '<div class="talk-box-top">' + qa.submitor + '（' + Util.currentTime() + '）</div>'
		+ '<p class="talk-box-area">' + qa.question + '</p>'
		+ '</div>';
	return sQElem;
}

function getAElem(qa){
	var sAElem = '<div class="talk-box qa-' + qa.id + '">'
		+ '<div class="talk-box-top">' + qa.submitor + '（' + Util.currentTime() + '）</div>'
		+ '<p class="talk-box-area">' + qa.question + '</p>'
		+ '</div>';
	return sAElem;
}

function removeQaUI(qa){
	$(".qa-"+qa.id).remove();
}