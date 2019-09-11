import org.codehaus.groovy.grails.plugins.metadata.GrailsPlugin
import org.codehaus.groovy.grails.web.pages.GroovyPage
import org.codehaus.groovy.grails.web.taglib.*
import org.codehaus.groovy.grails.web.taglib.exceptions.GrailsTagException
import org.springframework.web.util.*
import grails.util.GrailsUtil

class gsp_camaraOcr_camaraOcrindex_gsp extends GroovyPage {
public String getGroovyPageFileName() { "/WEB-INF/grails-app/views/camaraOcr/index.gsp" }
public Object run() {
Writer out = getOut()
Writer expressionOut = getExpressionOut()
registerSitemeshPreprocessMode()
printHtmlPart(0)
createTagBody(1, {->
printHtmlPart(1)
createTagBody(2, {->
createClosureForHtmlPart(2, 3)
invokeTag('captureTitle','sitemesh',4,[:],3)
})
invokeTag('wrapTitleTag','sitemesh',4,[:],2)
printHtmlPart(3)
invokeTag('captureMeta','sitemesh',7,['gsp_sm_xmlClosingForEmptyTag':(""),'charset':("utf-8")],-1)
printHtmlPart(1)
invokeTag('captureMeta','sitemesh',8,['gsp_sm_xmlClosingForEmptyTag':("/"),'content':("width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"),'name':("viewport")],-1)
printHtmlPart(4)
invokeTag('external','g',11,['dir':("js"),'file':("jquery-3.1.1.min.js")],-1)
printHtmlPart(1)
invokeTag('external','g',12,['dir':("js"),'file':("jquery.nicescroll.js")],-1)
printHtmlPart(1)
invokeTag('external','g',13,['dir':("js"),'file':("jquery.slimscroll.js")],-1)
printHtmlPart(1)
invokeTag('external','g',14,['dir':("js"),'file':("jquery.scrollTo.min.js")],-1)
printHtmlPart(1)
invokeTag('external','g',15,['dir':("js"),'file':("jquery.modal.min.js")],-1)
printHtmlPart(1)
invokeTag('external','g',16,['dir':("js"),'file':("jquery.blockUI.js")],-1)
printHtmlPart(1)
invokeTag('external','g',17,['dir':("js"),'file':("jquery.core.js")],-1)
printHtmlPart(1)
invokeTag('external','g',18,['dir':("css/assets"),'file':("style.css"),'rel':("stylesheet")],-1)
printHtmlPart(5)
invokeTag('external','g',20,['dir':("css/src"),'file':("styles.css"),'rel':("stylesheet")],-1)
printHtmlPart(6)
invokeTag('external','g',22,['dir':("js"),'file':("sweetalert.min.js")],-1)
printHtmlPart(7)
invokeTag('external','g',23,['dir':("js/ocr"),'file':("prueba.js")],-1)
printHtmlPart(8)
})
invokeTag('captureHead','sitemesh',24,[:],1)
printHtmlPart(9)
createClosureForHtmlPart(10, 1)
invokeTag('captureBody','sitemesh',29,[:],1)
printHtmlPart(11)
}
public static final Map JSP_TAGS = new HashMap()
protected void init() {
	this.jspTags = JSP_TAGS
}
public static final String CONTENT_TYPE = 'text/html;charset=UTF-8'
public static final long LAST_MODIFIED = 1568223079000L
public static final String EXPRESSION_CODEC = 'html'
public static final String STATIC_CODEC = 'none'
public static final String OUT_CODEC = 'html'
public static final String TAGLIB_CODEC = 'none'
}
