//# sourceMappingURL=grooscript-html-builder.js.map
function HtmlBuilder(){var a=gs.init("HtmlBuilder");a.clazz={name:"org.grooscript.builder.HtmlBuilder",simpleName:"HtmlBuilder"};a.clazz.superclass={name:"java.lang.Object",simpleName:"Object"};a.tagSolver=function(c,b){gs.mc(a.htmCd,"leftShift",gs.list(["<"+c+""]));gs.bool(b)&&0<gs.mc(b,"size",[])&&!gs.bool(gs.instanceOf(b[0],"String"))&&!gs.bool(gs.instanceOf(b[0],"Closure"))&&gs.mc(b[0],"each",[function(b,c){return gs.mc(a.htmCd,"leftShift",gs.list([" "+b+"='"+c+"'"]))}]);gs.mc(a.htmCd,"leftShift",
gs.list([gs.bool(b)?">":"/>"]));if(gs.bool(b)){if(gs.equals(gs.mc(b,"size",[]),1)&&gs.instanceOf(b[0],"String"))gs.mc(a,"yield",[b[0]]);else{var d=gs.mc(b,"last",[]);gs.instanceOf(d,"Closure")&&(gs.sp(d,"delegate",this),gs.execCall(d,this,[]));gs.instanceOf(d,"String")&&1<gs.mc(b,"size",[])&&gs.mc(a,"yield",[d])}return gs.mc(a.htmCd,"leftShift",gs.list(["</"+c+">"]))}};a.htmCd=gs.stringBuffer();a.build=function(a){return HtmlBuilder.build(a)};a.yield=function(c){return gs.mc(c,"each",[function(b){gs.equals(b,
"&")?gs.mc(a.htmCd,"leftShift",gs.list(["&amp;"])):gs.equals(b,"<")?gs.mc(a.htmCd,"leftShift",gs.list(["&lt;"])):gs.equals(b,">")?gs.mc(a.htmCd,"leftShift",gs.list(["&gt;"])):gs.equals(b,'"')?gs.mc(a.htmCd,"leftShift",gs.list(["&quot;"])):gs.equals(b,"'")?gs.mc(a.htmCd,"leftShift",gs.list(["&apos;"])):gs.mc(a.htmCd,"leftShift",gs.list([b]))}])};a.yieldUnescaped=function(c){return gs.mc(a.htmCd,"leftShift",gs.list([c]))};a.comment=function(c){gs.mc(a.htmCd,"leftShift",gs.list(["\x3c!--"]));gs.mc(a.htmCd,
"leftShift",gs.list([c]));return gs.mc(a.htmCd,"leftShift",gs.list(["--\x3e"]))};a.newLine=function(c){return gs.mc(a.htmCd,"leftShift",gs.list(["\n"]))};a.methodMissing=function(c,b){gs.sp(this,""+c+"",function(b){if(1==arguments.length&&arguments[0]instanceof Array)b=gs.list(arguments[0]);else if(1==arguments.length)b=gs.list([arguments[0]]);else if(1>arguments.length)b=gs.list([]);else if(1<arguments.length)for(b=gs.list([b]),gScount=1;gScount<arguments.length;gScount++)b.add(arguments[gScount]);
return gs.mc(a,"tagSolver",[c,b])});return gs.mc(this,"invokeMethod",[c,b],a)};a.HtmlBuilder0=function(a){return this};0==arguments.length&&a.HtmlBuilder0();1==arguments.length&&gs.passMapToObject(arguments[0],a);return a}HtmlBuilder.build=function(a){var c=gs.expandoMetaClass(HtmlBuilder,!1,!0);gs.mc(c,"initialize",[]);var b=HtmlBuilder();gs.sp(b,"metaClass",c);gs.sp(a,"delegate",b);gs.execCall(a,this,[]);return gs.mc(gs.gp(b,"htmCd"),"toString",[])};