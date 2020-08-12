!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";function t(e){return"%"==e[e.length-1]}function i(e,t,i){function r(e,t){var i=a.createShader(e);if(a.shaderSource(i,t),a.compileShader(i),!a.getShaderParameter(i,a.COMPILE_STATUS))throw new Error("compile error: "+a.getShaderInfoLog(i));return i}var o={};if(o.id=a.createProgram(),a.attachShader(o.id,r(a.VERTEX_SHADER,e)),a.attachShader(o.id,r(a.FRAGMENT_SHADER,t)),a.linkProgram(o.id),!a.getProgramParameter(o.id,a.LINK_STATUS))throw new Error("link error: "+a.getProgramInfoLog(o.id));o.uniforms={},o.locations={},a.useProgram(o.id),a.enableVertexAttribArray(0);for(var s,n,l=/uniform (\w+) (\w+)/g,d=e+t;null!=(s=l.exec(d));)n=s[2],o.locations[n]=a.getUniformLocation(o.id,n);return o}function r(e,t){a.activeTexture(a.TEXTURE0+(t||0)),a.bindTexture(a.TEXTURE_2D,e)}function o(e){var t=/url\(["']?([^"']*)["']?\)/.exec(e);return null==t?null:t[1]}var a,s=e(window),n=function(){function e(e,t){var r="OES_texture_"+e,o=r+"_linear",a=o in i,s=[r];return a&&s.push(o),{type:t,linearSupport:a,extensions:s}}var t=document.createElement("canvas");if(!(a=t.getContext("webgl")||t.getContext("experimental-webgl")))return null;var i={};if(["OES_texture_float","OES_texture_half_float","OES_texture_float_linear","OES_texture_half_float_linear"].forEach(function(e){var t=a.getExtension(e);t&&(i[e]=t)}),!i.OES_texture_float)return null;var r=[];r.push(e("float",a.FLOAT)),i.OES_texture_half_float&&r.push(e("half_float",i.OES_texture_half_float.HALF_FLOAT_OES));var o=a.createTexture(),s=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,s),a.bindTexture(a.TEXTURE_2D,o),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);for(var n=null,l=0;l<r.length;l++)if(a.texImage2D(a.TEXTURE_2D,0,a.RGBA,32,32,0,a.RGBA,r[l].type,null),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,o,0),a.checkFramebufferStatus(a.FRAMEBUFFER)===a.FRAMEBUFFER_COMPLETE){n=r[l];break}return n}(),l=function(e,t){try{return new ImageData(32,32)}catch(e){return document.createElement("canvas").getContext("2d").createImageData(32,32)}}();e("head").prepend("<style>.jquery-ripples { position: relative; z-index: 0; }</style>");var d=function(t,i){var r=this;this.$el=e(t),this.interactive=i.interactive,this.resolution=i.resolution,this.textureDelta=new Float32Array([1/this.resolution,1/this.resolution]),this.perturbance=i.perturbance,this.dropRadius=i.dropRadius,this.crossOrigin=i.crossOrigin,this.imageUrl=i.imageUrl;var o=document.createElement("canvas");o.width=this.$el.innerWidth(),o.height=this.$el.innerHeight(),this.canvas=o,this.$canvas=e(o),this.$canvas.css({position:"absolute",left:0,top:0,right:0,bottom:0,zIndex:-1}),this.$el.addClass("jquery-ripples").append(o),this.context=a=o.getContext("webgl")||o.getContext("experimental-webgl"),n.extensions.forEach(function(e){a.getExtension(e)}),e(window).on("resize",function(){var e=r.$el.innerWidth(),t=r.$el.innerHeight();e==r.canvas.width&&t==r.canvas.height||(o.width=e,o.height=t)}),this.textures=[],this.framebuffers=[],this.bufferWriteIndex=0,this.bufferReadIndex=1;for(var s=0;s<2;s++){var l=a.createTexture(),d=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,d),d.width=this.resolution,d.height=this.resolution,a.bindTexture(a.TEXTURE_2D,l),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,n.linearSupport?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,n.linearSupport?a.LINEAR:a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,this.resolution,this.resolution,0,a.RGBA,n.type,null),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,l,0),this.textures.push(l),this.framebuffers.push(d)}this.quad=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,this.quad),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,1,1,-1,1]),a.STATIC_DRAW),this.initShaders(),this.initTexture(),this.setTransparentTexture(),this.loadImage(),a.clearColor(0,0,0,0),a.blendFunc(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA),this.visible=!0,this.running=!0,this.inited=!0,this.setupPointerEvents(),requestAnimationFrame(function e(){r.step(),requestAnimationFrame(e)})};d.DEFAULTS={imageUrl:null,resolution:256,dropRadius:20,perturbance:.03,interactive:!0,crossOrigin:""},d.prototype={setupPointerEvents:function(){function e(e,i){t.visible&&t.running&&t.interactive&&t.dropAtPointer(e,t.dropRadius*(i?1.5:1),i?.14:.01)}var t=this;this.$el.on("mousemove.ripples",function(t){e(t)}).on("touchmove.ripples, touchstart.ripples",function(t){for(var i=t.originalEvent.changedTouches,r=0;r<i.length;r++)e(i[r])}).on("mousedown.ripples",function(t){e(t,!0)})},loadImage:function(){var e=this;a=this.context;var t=this.imageUrl||o(this.originalCssBackgroundImage)||o(this.$el.css("backgroundImage"));if(t!=this.imageSource){if(this.imageSource=t,!this.imageSource)return void this.setTransparentTexture();var i=new Image;i.onload=function(){function t(e){return 0==(e&e-1)}a=e.context;var r=t(i.width)&&t(i.height)?a.REPEAT:a.CLAMP_TO_EDGE;a.bindTexture(a.TEXTURE_2D,e.backgroundTexture),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,r),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,i),e.backgroundWidth=i.width,e.backgroundHeight=i.height,e.hideCssBackground()},i.onerror=function(){a=e.context,e.setTransparentTexture()},i.crossOrigin=function(e){return e.match(/^data:/)}(this.imageSource)?null:this.crossOrigin,i.src=this.imageSource}},step:function(){a=this.context,this.visible&&(this.computeTextureBoundaries(),this.running&&this.update(),this.render())},drawQuad:function(){a.bindBuffer(a.ARRAY_BUFFER,this.quad),a.vertexAttribPointer(0,2,a.FLOAT,!1,0,0),a.drawArrays(a.TRIANGLE_FAN,0,4)},render:function(){a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,this.canvas.width,this.canvas.height),a.enable(a.BLEND),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),a.useProgram(this.renderProgram.id),r(this.backgroundTexture,0),r(this.textures[0],1),a.uniform1f(this.renderProgram.locations.perturbance,this.perturbance),a.uniform2fv(this.renderProgram.locations.topLeft,this.renderProgram.uniforms.topLeft),a.uniform2fv(this.renderProgram.locations.bottomRight,this.renderProgram.uniforms.bottomRight),a.uniform2fv(this.renderProgram.locations.containerRatio,this.renderProgram.uniforms.containerRatio),a.uniform1i(this.renderProgram.locations.samplerBackground,0),a.uniform1i(this.renderProgram.locations.samplerRipples,1),this.drawQuad(),a.disable(a.BLEND)},update:function(){a.viewport(0,0,this.resolution,this.resolution),a.bindFramebuffer(a.FRAMEBUFFER,this.framebuffers[this.bufferWriteIndex]),r(this.textures[this.bufferReadIndex]),a.useProgram(this.updateProgram.id),this.drawQuad(),this.swapBufferIndices()},swapBufferIndices:function(){this.bufferWriteIndex=1-this.bufferWriteIndex,this.bufferReadIndex=1-this.bufferReadIndex},computeTextureBoundaries:function(){var e,i=this.$el.css("background-size"),r=this.$el.css("background-attachment"),o=function(e){var t=e.split(" ");if(1!==t.length)return t.map(function(t){switch(e){case"center":return"50%";case"top":case"left":return"0";case"right":case"bottom":return"100%";default:return t}});switch(e){case"center":return["50%","50%"];case"top":return["50%","0"];case"bottom":return["50%","100%"];case"left":return["0","50%"];case"right":return["100%","50%"];default:return[e,"50%"]}}(this.$el.css("background-position"));if("fixed"==r?((e={left:window.pageXOffset,top:window.pageYOffset}).width=s.width(),e.height=s.height()):((e=this.$el.offset()).width=this.$el.innerWidth(),e.height=this.$el.innerHeight()),"cover"==i)var a=Math.max(e.width/this.backgroundWidth,e.height/this.backgroundHeight),n=this.backgroundWidth*a,l=this.backgroundHeight*a;else"contain"==i?(a=Math.min(e.width/this.backgroundWidth,e.height/this.backgroundHeight),n=this.backgroundWidth*a,l=this.backgroundHeight*a):(n=(i=i.split(" "))[0]||"",l=i[1]||n,t(n)?n=e.width*parseFloat(n)/100:"auto"!=n&&(n=parseFloat(n)),t(l)?l=e.height*parseFloat(l)/100:"auto"!=l&&(l=parseFloat(l)),"auto"==n&&"auto"==l?(n=this.backgroundWidth,l=this.backgroundHeight):("auto"==n&&(n=this.backgroundWidth*(l/this.backgroundHeight)),"auto"==l&&(l=this.backgroundHeight*(n/this.backgroundWidth))));var d=o[0],u=o[1];d=t(d)?e.left+(e.width-n)*parseFloat(d)/100:e.left+parseFloat(d),u=t(u)?e.top+(e.height-l)*parseFloat(u)/100:e.top+parseFloat(u);var h=this.$el.offset();this.renderProgram.uniforms.topLeft=new Float32Array([(h.left-d)/n,(h.top-u)/l]),this.renderProgram.uniforms.bottomRight=new Float32Array([this.renderProgram.uniforms.topLeft[0]+this.$el.innerWidth()/n,this.renderProgram.uniforms.topLeft[1]+this.$el.innerHeight()/l]);var c=Math.max(this.canvas.width,this.canvas.height);this.renderProgram.uniforms.containerRatio=new Float32Array([this.canvas.width/c,this.canvas.height/c])},initShaders:function(){var e=["attribute vec2 vertex;","varying vec2 coord;","void main() {","coord = vertex * 0.5 + 0.5;","gl_Position = vec4(vertex, 0.0, 1.0);","}"].join("\n");this.dropProgram=i(e,["precision highp float;","const float PI = 3.141592653589793;","uniform sampler2D texture;","uniform vec2 center;","uniform float radius;","uniform float strength;","varying vec2 coord;","void main() {","vec4 info = texture2D(texture, coord);","float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);","drop = 0.5 - cos(drop * PI) * 0.5;","info.r += drop * strength;","gl_FragColor = info;","}"].join("\n")),this.updateProgram=i(e,["precision highp float;","uniform sampler2D texture;","uniform vec2 delta;","varying vec2 coord;","void main() {","vec4 info = texture2D(texture, coord);","vec2 dx = vec2(delta.x, 0.0);","vec2 dy = vec2(0.0, delta.y);","float average = (","texture2D(texture, coord - dx).r +","texture2D(texture, coord - dy).r +","texture2D(texture, coord + dx).r +","texture2D(texture, coord + dy).r",") * 0.25;","info.g += (average - info.r) * 2.0;","info.g *= 0.995;","info.r += info.g;","gl_FragColor = info;","}"].join("\n")),a.uniform2fv(this.updateProgram.locations.delta,this.textureDelta),this.renderProgram=i(["precision highp float;","attribute vec2 vertex;","uniform vec2 topLeft;","uniform vec2 bottomRight;","uniform vec2 containerRatio;","varying vec2 ripplesCoord;","varying vec2 backgroundCoord;","void main() {","backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);","backgroundCoord.y = 1.0 - backgroundCoord.y;","ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;","gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);","}"].join("\n"),["precision highp float;","uniform sampler2D samplerBackground;","uniform sampler2D samplerRipples;","uniform vec2 delta;","uniform float perturbance;","varying vec2 ripplesCoord;","varying vec2 backgroundCoord;","void main() {","float height = texture2D(samplerRipples, ripplesCoord).r;","float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;","float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;","vec3 dx = vec3(delta.x, heightX - height, 0.0);","vec3 dy = vec3(0.0, heightY - height, delta.y);","vec2 offset = -normalize(cross(dy, dx)).xz;","float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);","gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;","}"].join("\n")),a.uniform2fv(this.renderProgram.locations.delta,this.textureDelta)},initTexture:function(){this.backgroundTexture=a.createTexture(),a.bindTexture(a.TEXTURE_2D,this.backgroundTexture),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,1),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR)},setTransparentTexture:function(){a.bindTexture(a.TEXTURE_2D,this.backgroundTexture),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,l)},hideCssBackground:function(){var e=this.$el[0].style.backgroundImage;"none"!=e&&(this.originalInlineCss=e,this.originalCssBackgroundImage=this.$el.css("backgroundImage"),this.$el.css("backgroundImage","none"))},restoreCssBackground:function(){this.$el.css("backgroundImage",this.originalInlineCss||"")},dropAtPointer:function(e,t,i){var r=parseInt(this.$el.css("border-left-width"))||0,o=parseInt(this.$el.css("border-top-width"))||0;this.drop(e.pageX-this.$el.offset().left-r,e.pageY-this.$el.offset().top-o,t,i)},drop:function(e,t,i,o){a=this.context;var s=this.$el.innerWidth(),n=this.$el.innerHeight(),l=Math.max(s,n);i/=l;var d=new Float32Array([(2*e-s)/l,(n-2*t)/l]);a.viewport(0,0,this.resolution,this.resolution),a.bindFramebuffer(a.FRAMEBUFFER,this.framebuffers[this.bufferWriteIndex]),r(this.textures[this.bufferReadIndex]),a.useProgram(this.dropProgram.id),a.uniform2fv(this.dropProgram.locations.center,d),a.uniform1f(this.dropProgram.locations.radius,i),a.uniform1f(this.dropProgram.locations.strength,o),this.drawQuad(),this.swapBufferIndices()},destroy:function(){this.$el.off(".ripples").removeClass("jquery-ripples").removeData("ripples"),this.$canvas.remove(),this.restoreCssBackground()},show:function(){this.visible=!0,this.$canvas.show(),this.hideCssBackground()},hide:function(){this.visible=!1,this.$canvas.hide(),this.restoreCssBackground()},pause:function(){this.running=!1},play:function(){this.running=!0},set:function(e,t){switch(e){case"dropRadius":case"perturbance":case"interactive":case"crossOrigin":this[e]=t;break;case"imageUrl":this.imageUrl=t,this.loadImage()}}};var u=e.fn.ripples;e.fn.ripples=function(t){if(!n)throw new Error("Your browser does not support WebGL, the OES_texture_float extension or rendering to floating point textures.");var i=arguments.length>1?Array.prototype.slice.call(arguments,1):void 0;return this.each(function(){var r=e(this),o=r.data("ripples"),a=e.extend({},d.DEFAULTS,r.data(),"object"==typeof t&&t);(o||"string"!=typeof t)&&(o?"string"==typeof t&&d.prototype[t].apply(o,i):r.data("ripples",o=new d(this,a)))})},e.fn.ripples.Constructor=d,e.fn.ripples.noConflict=function(){return e.fn.ripples=u,this}}),function(e){"use strict";document.addEventListener("DOMContentLoaded",function(){}),e(".vand").ripples({resolution:712,dropRadius:20,perturbance:.04})}(jQuery),function(e){"use strict";e(window).on("load",function(){e('header .nav.navbar-nav li a, .offcanvas_text ul li a[href^="#"]:not([href="#"])').on("click",function(t){var i=e(this);e("html, body").stop().animate({scrollTop:e(i.attr("href")).offset().top-85},1500),t.preventDefault()})});var t,i=e("header").height();function r(){e(".ten_say_slider").length&&e(".ten_say_slider").owlCarousel({loop:!0,margin:30,items:2,nav:!1,autoplay:!1,smartSpeed:1500,dots:!0,navText:['<i class="icofont icofont-thin-left"></i>','<i class="icofont icofont-thin-right"></i>'],responsiveClass:!0})}function r(){e(".g_p_slider").length&&e(".g_p_slider").owlCarousel({loop:!0,margin:50,items:3,nav:!1,autoplay:!1,smartSpeed:1500,dots:!0,responsiveClass:!0,center:!0,responsive:{0:{items:1},480:{items:2},600:{items:2,center:!1},767:{items:3}}})}e(".main_header_area, .dash_tp_menu_area, .hosting_menu, .mobile_menu_inner").length&&e(window).scroll(function(){e(window).scrollTop()>=i?e(".main_header_area, .dash_tp_menu_area, .hosting_menu, .mobile_menu_inner").addClass("navbar_fixed"):e(".main_header_area, .dash_tp_menu_area, .hosting_menu, .mobile_menu_inner").removeClass("navbar_fixed")}),e(".menu_icon, .close_icon").on("click",function(){return e(".offcanvas_menu").hasClass("open")?e(".offcanvas_menu").removeClass("open"):e(".offcanvas_menu").addClass("open"),!1}),e("#main_slider").length&&e("#main_slider").revolution({sliderType:"standard",sliderLayout:"auto",delay:6e6,disableProgressBar:"on",navigation:{onHoverStop:"off",touch:{touchenabled:"on",swipe_threshold:75,swipe_min_touches:1,swipe_direction:"vertical",drag_block_vertical:!1},bullets:{enable:!0,hide_onmobile:!0,hide_under:1100,style:"hermes",hide_onleave:!1,direction:"vertical",h_align:"right",v_align:"center",h_offset:170,v_offset:0,space:10,tmp:""}},responsiveLevels:[4096,1199,992,767,480],gridwidth:[1170,1e3,750,700,300],gridheight:[900,900,760,600,500],lazyType:"smart",fallbacks:{simplifyAll:"off",nextSlideOnWindowFocus:"off",disableFocusListener:!1}}),e("#main_slider2").length&&e("#main_slider2").revolution({sliderType:"standard",sliderLayout:"auto",delay:4e7,disableProgressBar:"on",navigation:{onHoverStop:"off",touch:{touchenabled:"on"},arrows:{style:"zeus",enable:!1,hide_onmobile:!0,hide_under:767,hide_onleave:!0,hide_delay:200,hide_delay_mobile:1200,tmp:'<div class="tp-title-wrap">  \t<div class="tp-arr-imgholder"></div> </div>',left:{h_align:"left",v_align:"center",h_offset:50,v_offset:0},right:{h_align:"right",v_align:"center",h_offset:50,v_offset:0}}},responsiveLevels:[4096,1199,992,767,480],gridwidth:[1170,1e3,750,700,300],gridheight:[850,850,700,600,600],lazyType:"smart",fallbacks:{simplifyAll:"off",nextSlideOnWindowFocus:"off",disableFocusListener:!1}}),e("#main_slider_eight").length&&e("#main_slider_eight").revolution({sliderType:"standard",sliderLayout:"auto",delay:4e7,disableProgressBar:"on",navigation:{onHoverStop:"off",touch:{touchenabled:"on"},arrows:{style:"zeus",enable:!1,hide_onmobile:!0,hide_under:767,hide_onleave:!0,hide_delay:200,hide_delay_mobile:1200,tmp:'<div class="tp-title-wrap">  \t<div class="tp-arr-imgholder"></div> </div>',left:{h_align:"left",v_align:"center",h_offset:50,v_offset:0},right:{h_align:"right",v_align:"center",h_offset:50,v_offset:0}}},responsiveLevels:[4096,1199,992,767,480],gridwidth:[1170,1e3,750,700,300],gridheight:[950,950,950,600,500],lazyType:"smart",fallbacks:{simplifyAll:"off",nextSlideOnWindowFocus:"off",disableFocusListener:!1}}),e("#main_slider_two").length&&e("#main_slider_two").revolution({sliderType:"standard",sliderLayout:"auto",delay:4e7,disableProgressBar:"on",navigation:{onHoverStop:"off",touch:{touchenabled:"on"},arrows:{style:"normal",enable:!0,hide_onmobile:!0,hide_under:767,hide_onleave:!0,hide_delay:200,hide_delay_mobile:1200,left:{h_align:"left",v_align:"center",h_offset:170,v_offset:0},right:{h_align:"right",v_align:"center",h_offset:170,v_offset:0}}},responsiveLevels:[4096,1199,992,767,480],gridwidth:[1170,1e3,750,700,300],gridheight:[800,800,800,600,500],lazyType:"smart",fallbacks:{simplifyAll:"off",nextSlideOnWindowFocus:"off",disableFocusListener:!1}}),e("#main_slider_ten").length&&e("#main_slider_ten").revolution({sliderType:"standard",sliderLayout:"auto",delay:4e7,disableProgressBar:"on",navigation:{onHoverStop:"off",touch:{touchenabled:"on"},bullets:{enable:!0,hide_onmobile:!0,hide_under:1100,style:"hermes",hide_onleave:!1,direction:"vertical",h_align:"right",v_align:"center",h_offset:50,v_offset:0,space:-5,tmp:""}},responsiveLevels:[4096,1199,992,767,480],gridwidth:[1170,1e3,750,700,300],gridheight:[990,990,700,600,500],lazyType:"smart",fallbacks:{simplifyAll:"off",nextSlideOnWindowFocus:"off",disableFocusListener:!1}}),e("#dash_slider").length&&e("#dash_slider").revolution({sliderType:"standard",sliderLayout:"auto",delay:6e6,disableProgressBar:"on",navigation:{onHoverStop:"off",touch:{touchenabled:"on",swipe_threshold:75,swipe_min_touches:1,swipe_direction:"vertical",drag_block_vertical:!1}},responsiveLevels:[4096,1199,992,767,480],gridwidth:[1170,1e3,750,700,300],gridheight:[1014,1014,760,600,500],lazyType:"smart",fallbacks:{simplifyAll:"off",nextSlideOnWindowFocus:"off",disableFocusListener:!1}}),new Swiper(".swiper-container",{effect:"coverflow",grabCursor:!0,centeredSlides:!0,slidesPerView:3,spaceBetween:-150,coverflowEffect:{rotate:20,stretch:0,depth:50,modifier:2,slideShadows:!0},pagination:{el:".swiper-pagination"},breakpoints:{575:{slidesPerView:1,spaceBetween:0,rotate:0,stretch:0,depth:0,modifier:1},991:{slidesPerView:2,spaceBetween:-120}}}),e(document).ready(function(){e(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({disableOn:700,type:"iframe",mainClass:"mfp-fade",removalDelay:160,preloader:!1,fixedContentPos:!1})}),e(".testimonial-carousel").length&&e(".testimonial-carousel").owlCarousel({loop:!0,margin:50,items:3,nav:!1,autoplay:!1,smartSpeed:1500,dots:!0,responsiveClass:!0,responsive:{0:{items:1},767:{items:2},1024:{items:3}}}),e(".screenshot_carousel").length&&e(".screenshot_carousel").owlCarousel({loop:!0,margin:0,items:3,nav:!1,autoplay:!0,smartSpeed:1500,dots:!0,responsiveClass:!0,responsive:{0:{items:2},575:{items:3}}}),e(".screen_nine_slider").length&&e(".screen_nine_slider").owlCarousel({loop:!0,margin:30,items:5,stagePadding:80,nav:!0,autoplay:!1,smartSpeed:1500,dots:!0,navContainer:".screen_nine_area",navText:['<i class="lnr lnr-arrow-left"><span>Previous</span></i>','<i class="lnr lnr-arrow-right"><span>Next</span></i>'],responsiveClass:!0,responsive:{0:{items:1},400:{items:2,stagePadding:0},575:{items:3,stagePadding:0},700:{items:4,nav:!1,stagePadding:0},1200:{items:5}}}),e(".user_slider").length&&e(".user_slider").owlCarousel({loop:!0,margin:30,items:1,nav:!1,autoplay:!0,smartSpeed:1500,dots:!1,responsiveClass:!0}),e(".shop_now_slider").length&&e(".shop_now_slider").owlCarousel({loop:!0,margin:30,items:3,nav:!0,autoplay:!1,smartSpeed:1500,dots:!1,navContainer:".shop_now_slider",navText:['<i class="icofont icofont-thin-left"></i>','<i class="icofont icofont-thin-right"></i>'],responsiveClass:!0,responsive:{0:{items:1},540:{items:2},600:{items:2},992:{items:3}}}),e(".app_screen_slider").length&&e(".app_screen_slider").owlCarousel({loop:!0,margin:40,items:3,nav:!1,autoplay:!0,smartSpeed:1500,dots:!0,responsiveClass:!0,responsive:{0:{items:2,margin:20},600:{items:3,margin:40}}}),e(".l_blog_slider").length&&e(".l_blog_slider").owlCarousel({loop:!0,margin:0,items:1,nav:!0,autoplay:!0,smartSpeed:1500,dots:!0,navContainer:".l_blog_text_inner",navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],responsiveClass:!0}),e(".dash_screen_slider").length&&e(".dash_screen_slider").owlCarousel({loop:!0,margin:50,items:3,nav:!0,autoplay:!0,smartSpeed:1500,dots:!1,navContainerClass:"dash_screen_slider",navText:['<i class="fa fa-arrow-left" aria-hidden="true"></i>','<i class="fa fa-arrow-right" aria-hidden="true"></i>'],responsiveClass:!0,responsive:{0:{items:1},575:{items:2},768:{items:3}}}),e(".team_slider, .team_slider_two").length&&e(".team_slider, .team_slider_two").owlCarousel({loop:!0,margin:30,items:4,nav:!1,autoplay:!0,smartSpeed:1500,dots:!1,responsiveClass:!0,responsive:{0:{items:1},480:{items:2},700:{items:3},1200:{items:4}}}),e(".clients_logo_slider").length&&e(".clients_logo_slider").owlCarousel({loop:!0,margin:30,items:5,nav:!1,autoplay:!0,smartSpeed:1500,dots:!1,responsiveClass:!0,responsive:{0:{items:1},480:{items:2},600:{items:4},992:{items:5}}}),e(".dev_seven_logo_slider").length&&e(".dev_seven_logo_slider").owlCarousel({loop:!0,margin:30,items:4,nav:!1,autoplay:!0,smartSpeed:1500,dots:!1,responsiveClass:!0,responsive:{0:{items:1},480:{items:2},767:{items:3},992:{items:4}}}),e(".testimonial_slider_three, .testimonials_s_slider").length&&e(".testimonial_slider_three, .testimonials_s_slider").owlCarousel({loop:!0,margin:30,items:1,nav:!0,autoplay:!1,smartSpeed:1500,dots:!0,navText:['<i class="icofont icofont-thin-left"></i>','<i class="icofont icofont-thin-right"></i>'],responsiveClass:!0}),e(".related_post_slider").length&&e(".related_post_slider").owlCarousel({loop:!1,margin:30,stagePadding:100,items:2,nav:!0,autoplay:!1,smartSpeed:1500,dots:!1,navText:['<i class="lnr lnr-arrow-left"></i>','<i class="lnr lnr-arrow-right"></i>'],responsiveClass:!0,responsive:{0:{items:1},320:{items:1,stagePadding:0},400:{items:2,stagePadding:0},575:{items:2}}}),r(),r(),e(".ten_team_slider").length&&e(".ten_team_slider").owlCarousel({loop:!0,margin:30,items:3,nav:!1,autoplay:!1,smartSpeed:1500,dots:!0,responsiveClass:!0,responsive:{0:{items:1},530:{items:2},600:{items:2},992:{items:3}}}),e(".g_p_p_slider").length&&e(".g_p_p_slider").owlCarousel({loop:!0,margin:30,items:4,nav:!0,autoplay:!1,smartSpeed:1500,dots:!1,navText:['<i class="icofont icofont-thin-left"></i>','<i class="icofont icofont-thin-right"></i>'],responsiveClass:!0,responsive:{0:{items:1},480:{items:2},700:{items:3},992:{items:4}}}),e(".sc-clients-slider").length&&e(".sc-clients-slider").owlCarousel({loop:!0,margin:30,items:6,nav:!1,autoplay:!1,smartSpeed:1500,dots:!1,responsiveClass:!0,responsive:{0:{items:2},400:{items:3},575:{items:4},850:{items:6}}}),e(".counter").counterUp({delay:10,time:1e3}),e(document).ready(function(){e(".select_dropdown").niceSelect()}),(t=e(".piechart")).length&&t.each(function(){var t=e(this),i=t.data("value"),r=(t.parent().width(),t.data("border-color"));t.find("span").each(function(){var t=e(this);t.appear(function(){t.countTo({from:1,to:100*i,speed:2e3})})}),t.appear(function(){t.circleProgress({value:i,size:110,thickness:4,emptyFill:"#e0e0e0",animation:{duration:2e3},fill:{color:r}})})}),e("#video-popup").length>0&&e("#video-popup").magnificPopup({type:"iframe"}),e(".flexslider").flexslider({animation:"slide",itemWidth:260,itemMargin:30,maxItems:5,controlNav:!1,animationLoop:!1,slideshow:!1,controlsContainer:e(".flexslider")}),e(function(){e(".gallery_item .slides").mixItUp()}),e(".asked_ques_inner, .blog_ms_inner").length&&e(".asked_ques_inner, .blog_ms_inner").imagesLoaded(function(){e(".asked_ques_inner, .blog_ms_inner").isotope({layoutMode:"masonry",masonry:{columnWidth:1}})}),e(".portfolio_filter li").length&&e(".portfolio_filter li").on("click",function(){e(".portfolio_filter li").removeClass("active"),e(this).addClass("active");var t=e(this).attr("data-filter");return e(".screen_nine_slider .owl-item").isotope({filter:t,animationOptions:{duration:450,easing:"linear",queue:!1}}),!1}),e(".flip_ten_slider").flipster({touch:!0,scrollwheel:!1,spacing:-.4});var o=e(".gd_man_text");o.length&&o.owlCarousel({loop:!1,margin:0,dots:!1,autoplay:!0,mouseDrag:!1,touchDrag:!1,navSpeed:500,items:1,smartSpeed:2500});var a=e(".gd_man_slider");if(a.length&&a.owlCarousel({loop:!1,margin:0,dots:!1,autoplay:!0,mouseDrag:!1,touchDrag:!1,animateOut:"slideOutUp",animateIn:"fadeInUp",items:1,smartSpeed:2500}),e(".home_screen_nav .testi_next").on("click",function(){o.trigger("next.owl.carousel"),a.trigger("next.owl.carousel")}),e(".home_screen_nav .testi_prev").on("click",function(){o.trigger("prev.owl.carousel"),a.trigger("prev.owl.carousel")}),o.on("translate.owl.carousel",function(t){e(".slider_bg_inner .owl-dots:eq("+t.page.index+")").click()}),a.on("translate.owl.carousel",function(t){e(".text_slider_inner .owl-dots:eq("+t.page.index+")").click()}),e("#mapBox").length){var s=e("#mapBox").data("lat"),n=e("#mapBox").data("lon"),l=e("#mapBox").data("zoom"),d=e("#mapBox").data("marker"),u=e("#mapBox").data("info"),h=e("#mapBox").data("mlat"),c=e("#mapBox").data("mlon");new GMaps({el:"#mapBox",lat:s,lng:n,scrollwheel:!1,scaleControl:!0,streetViewControl:!1,panControl:!0,disableDoubleClickZoom:!0,mapTypeControl:!1,zoom:l,styles:[{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"simplified"},{hue:"#ff0000"}]}]}).addMarker({lat:h,lng:c,icon:d,infoWindow:{content:u}})}e(window).on("load",function(){e("#preloader_spinner").fadeOut(),e("#preloader").delay(150).fadeOut("slow"),e("body").delay(150).css({overflow:"visible"})})}(jQuery);