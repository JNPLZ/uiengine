(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{73:function(e,i,t){"use strict";var n=t(65),r={resizeFrom:"child",checkOrigin:!1};i.a={data:function(){return{isBreakpointsActive:!1,iframeWidth:null}},methods:{mountResizableIframe:function(e){e.addEventListener("load",this.setupIframe.bind(this))},unmountResizableIframe:function(e){e.iFrameResizer&&e.iFrameResizer.close(),e.removeEventListener("load",this.setupIframe.bind(this))},setupIframe:function(e){var i=this,t=e.currentTarget;if(!t.getAttribute("height")&&"about:blank"!==t.src){var a=t.contentWindow;window.UIengine.iframeScripts.forEach((function(e){return i.addScriptToIframe(e,t)})),t.iFrameResizer||Object(n.iframeResizer)(r,t),this.iframeWidth=a.innerWidth,a.onresize=this.iframeResizeHandler.bind(this),this.$emit("iframe:load",t)}},iframeResizeHandler:function(e){var i=e.target.innerWidth;this.iframeWidth=i},addScriptToIframe:function(e,i){var t=i.contentDocument.getElementsByTagName("head")[0],n=document.createElement("script");n.src=e,n.async=!1,t.appendChild(n)}}}}}]);