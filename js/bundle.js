!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0});var o=t.getRandomNumber=function(e,t){return Math.floor(Math.random()*(t+1-e))+e},i=t.getRandomArrayElement=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=o(0,e.length-1),r=e[n];return t&&e.splice(n,1),r},u=(t.getRandomArray=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.length,u=e.slice(),c=o(t,n);return function e(t,n){if(t.length===c)return t;var o=i(n,!0);return e([].concat(r(t),[o]),n)}([],u)},t.getArrayWithoutElement=function(e,t){return e.reduce(function(e,n){return n===t?e:[].concat(r(e),[n])},[])},t.removeChildren=function(e){for(;e.lastChild;)e.removeChild(e.lastChild)},t.runOnEscPress=function(e,t){27===e.keyCode&&t()},t.runOnEnterPress=function(e,t){13===e.keyCode&&t()},void 0);t.debounce=function(e,t){u&&window.clearTimeout(u),u=window.setTimeout(e,t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updatePhotos=void 0;var r=function(e){return e&&e.__esModule?e:{default:e}}(n(4)),o=c(n(6)),i=c(n(2)),u=c(n(12));function c(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function l(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var a=document.querySelector(".pictures"),s=document.querySelector(".img-upload__form").querySelector("#upload-file"),d=document.querySelector(".error-popup"),f=d.querySelector(".error-popup__cancel"),m=d.querySelector(".error-popup__message"),v=[],p=[],y=function(e){var t=document.createDocumentFragment();(p=e.map(function(e){return e.create()})).forEach(function(e){return t.appendChild(e)}),a.appendChild(t)},_=(t.updatePhotos=function(e){p.forEach(function(e){return a.removeChild(e)}),y(e)},function(e){v=e.map(function(e){return function(e){var t=e.comments.reduce(function(e,t){return t.length>140?[].concat(l(e),l(t.split(". "))):[].concat(l(e),[t])},[]);return{url:e.url,likes:e.likes,comments:t,description:e.description}}(e)}).map(function(e){return new r.default(e)}),y(v),u.initialize(v)}),h=function e(){d.classList.add("hidden"),f.removeEventListener("click",e)},g=function(e){d.classList.contains("hidden")&&(d.classList.remove("hidden"),m.textContent=e,setTimeout(h,5e3),f.addEventListener("click",h))};i.load(_,g),s.addEventListener("change",o.initialize)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="https://js.dump.academy/kekstagram",o={400:"Неверный запрос",401:"Пользователь не авторизован",404:"Ничего на найдено",500:"Внутренняя ошибка сервера"},i=function(e,t){var n=new XMLHttpRequest;return n.responseType="json",n.addEventListener("load",function(){200===n.status?e(n.response):t(n.status+": "+o[n.status])}),n.addEventListener("error",function(){return t("Произошла ошибка соединения")}),n.addEventListener("timeout",function(){return t("Запрос не успел выполниться за "+n.timeout+" мс")}),n.timeout=5e3,n};t.load=function(e,t){var n=i(e,t);n.open("GET",r+"/data"),n.send()},t.upload=function(e,t,n){var o=i(t,n);o.open("POST",r),o.send(e)}},function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(5));var i=document.querySelector("#picture").content.querySelector(".picture__link"),u=function(){function e(t){var n=t.url,r=t.likes,o=t.comments,i=t.description;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.url=n,this.likes=r,this.comments=o,this.description=i}return r(e,[{key:"create",value:function(){var e=this,t=i.cloneNode(!0),n=t.querySelector(".picture__img"),r=t.querySelector(".picture__stat--comments"),u=t.querySelector(".picture__stat--likes");return n.src=this.url,r.textContent=this.comments.length,u.textContent=this.likes,t.addEventListener("click",function(){o.open(e)}),t}}]),e}();t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.open=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0));var o=document.querySelector("body"),i=document.querySelector(".big-picture"),u=i.querySelector(".cancel"),c=i.querySelector(".big-picture__img").querySelector("img"),l=i.querySelector(".social__comment-count"),a=i.querySelector(".social__comment-loadmore"),s=i.querySelector(".comments-loaded"),d=i.querySelector(".social__caption"),f=i.querySelector(".likes-count"),m=i.querySelector(".social__comments"),v=[],p=0,y=function(e){var t=e.map(function(e){return function(e){return'<li class="social__comment social__comment--text">\n  <img class="social__picture" src="img/avatar-'+r.getRandomNumber(1,6)+'.svg"\n  alt="Аватар комментатора фотографии" width="35" height="35">'+e+"</li>"}(e)});m.insertAdjacentHTML("beforeend",t.join("")),function(e){s.textContent=e}(p+=e.length)},_=function(){v.length<=5&&g(),y(v.splice(0,5))},h=function(e){r.runOnEnterPress(e,_)},g=function(){a.classList.add("hidden"),a.removeEventListener("click",_),a.removeEventListener("keydown",h)},L=function(e){c.src=e.url,d.textContent=e.description,f.textContent=e.likes,r.removeChildren(m),v=e.comments.slice(),l.querySelector(".comments-count").textContent=v.length,l.classList.remove("hidden"),y(v.splice(0,5)),e.comments.length<=5?g():(a.classList.remove("hidden"),a.addEventListener("click",_),a.addEventListener("keydown",h))},S=function e(){v=[],p=0,o.classList.remove("modal-open"),i.classList.add("hidden"),l.classList.add("hidden"),u.removeEventListener("click",e),document.removeEventListener("keydown",q)},q=function(e){r.runOnEscPress(e,S)};t.open=function(e){o.classList.add("modal-open"),i.classList.remove("hidden"),u.addEventListener("click",S),document.addEventListener("keydown",q),L(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initialize=void 0;var r=a(n(0)),o=a(n(7)),i=a(n(8)),u=a(n(2)),c=a(n(10)),l=function(e){return e&&e.__esModule?e:{default:e}}(n(11));function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var s=document.querySelector("body"),d=document.querySelector("#upload-file"),f=document.querySelector(".img-upload__form"),m=f.querySelector(".text__hashtags"),v=f.querySelector(".text__description"),p=document.querySelector(".img-upload__overlay"),y=p.querySelector("#upload-cancel"),_=f.querySelector(".img-upload__message--error"),h=_.querySelector(".error__message"),g=p.querySelector(".img-upload__preview > img"),L=p.querySelectorAll(".effects__preview"),S=f.querySelector(".img-upload__message--loading"),q=["gif","jpg","jpeg","png"],b=function(){f.reset(),P()},E=function(e){P(),_.classList.remove("hidden"),h.textContent=e},k=function(e){u.upload(new FormData(f),b,E),e.preventDefault()},P=function e(){f.reset(),d.value="",o.finalize(),i.finalize(),s.classList.remove("modal-open"),p.classList.add("hidden"),y.removeEventListener("click",e),document.removeEventListener("keydown",O)},O=function(e){e.target!==m&&e.target!==v&&r.runOnEscPress(e,P)};t.initialize=function(e){S.classList.remove("hidden");var t=e.target.files[0];(0,l.default)(t,q,function(e){g.src=e,Array.from(L).forEach(function(t){t.style.backgroundImage="url("+e+")"}),c.initialize(),o.initialize(),i.initialize(),s.classList.add("modal-open"),p.classList.remove("hidden"),y.addEventListener("click",P),document.addEventListener("keydown",O),f.addEventListener("submit",k),S.classList.add("hidden")})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=document.querySelector(".img-upload__form"),o=r.querySelector(".resize__control--minus"),i=r.querySelector(".resize__control--plus"),u=r.querySelector(".resize__control--value"),c=r.querySelector(".img-upload__preview"),l=25,a=100,s=100,d=25,f=100,m=function(e){u.value=e+"%",c.style="transform: scale("+e/100+")",f=e},v=function(){f>l&&m(f-d)},p=function(){f<a&&m(f+d)};t.initialize=function(){m(s),o.addEventListener("click",v),i.addEventListener("click",p)},t.finalize=function(){o.removeEventListener("click",v),i.removeEventListener("click",p)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.finalize=t.initialize=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(9));var o=document.querySelector(".img-upload__overlay"),i=o.querySelector(".scale").querySelector(".scale__value"),u=o.querySelector(".effects"),c=u.querySelectorAll(".effects__radio"),l=u.querySelector("#effect-none"),a=o.querySelector(".img-upload__preview > img"),s={chrome:{min:0,max:1,setFilter:function(e){return"grayscale("+e+")"}},sepia:{min:0,max:1,setFilter:function(e){return"sepia("+e+")"}},marvin:{min:0,max:100,setFilter:function(e){return"invert("+e+"%)"}},phobos:{min:0,max:3,setFilter:function(e){return"blur("+e+"px)"}},heat:{min:1,max:3,setFilter:function(e){return"brightness("+e+")"}},none:{min:0,max:0,setFilter:function(){return"none"}}},d=void 0,f=function(e){d&&a.classList.remove(d),a.classList.add("effects__preview--"+e),d="effects__preview--"+e},m=function(e){var t=function(e,t){var n=s[t];return n.min+e*(n.max-n.min)/100}(i.value,e);a.style.filter=s[e].setFilter(t)},v=function(e){var t=e.target;t===l?r.hide():(r.show(),r.setPinAction(t.value,m)),r.setPinPosition(100),f(t.value),m(t.value)};t.initialize=function(){Array.from(c).forEach(function(e){return e.addEventListener("click",v)}),l.checked=!0,f(l.value),m(l.value),r.hide()},t.finalize=function(){Array.from(c).forEach(function(e){return e.removeEventListener("click",v)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=document.querySelector(".img-upload__overlay").querySelector(".scale"),o=r.querySelector(".scale__value"),i=r.querySelector(".scale__pin"),u=r.querySelector(".scale__level"),c=r.querySelector(".scale__line"),l=void 0,a=(t.hide=function(){r.classList.add("hidden"),i.removeEventListener("mousedown",s)},t.show=function(){r.classList.contains("hidden")&&(r.classList.remove("hidden"),i.addEventListener("mousedown",s))},t.setPinPosition=function(e){o.value=Math.round(e),i.style.left=e+"%",u.style.width=e+"%"}),s=(t.setPinAction=function(e,t){l={effect:e,action:t}},function(e){e.preventDefault();var t=c.offsetWidth,n=e.clientX;i.style.cursor="none",document.documentElement.style.cursor="none";var r=function(e){e.preventDefault();var r=n-e.clientX;n=e.clientX;var o=i.offsetLeft-r;o<0?o=0:o>t&&(o=t),a(100*o/t),l.action(l.effect)};document.addEventListener("mousemove",r),document.addEventListener("mouseup",function e(t){t.preventDefault(),i.style.cursor="move",document.documentElement.style.cursor="auto",document.removeEventListener("mousemove",r),document.removeEventListener("mouseup",e)})})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initialize=void 0;var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(0));var o=document.querySelector(".img-upload__form"),i=o.querySelector(".text__hashtags"),u=o.querySelector(".text__description"),c=o.querySelector(".img-upload__submit"),l="#",a=2,s=20,d=5,f=[{message:!1,check:function(e){return 0===e.length}},{message:"Хэш-тэгов должно быть не более "+d,check:function(e){return e.length>d}},{message:"Хэш-тэг должен начинаться с #",check:function(e){return e.some(function(e){return e[0]!==l})}},{message:"Хэш-тэг должен состоять минимум из "+a+" символов",check:function(e){return e.some(function(e){return e.length<a})}},{message:"Хэш-тэг не должен превышать "+s+" символов",check:function(e){return e.some(function(e){return e.length>s})}},{message:"Хэш-тэги должны быть уникальными",check:function(e){return e.some(function(e,t,n){return n.indexOf(e)!==t})}},{message:!1,check:function(e){return e}}],m=function(e){var t=function(e){return f.find(function(t){return(0,t.check)(e)})}(function(e){var t=e.split(" ").map(function(e){return e.toLowerCase()});return r.getArrayWithoutElement(t,"")}(e)).message;t?i.setCustomValidity(t):i.setCustomValidity("")};t.initialize=function(){!function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(e){e.addEventListener("input",function(){e.setCustomValidity("")})})}(i,u),c.addEventListener("click",function(){m(i.value),function(e){e.length>140?u.setCustomValidity("Длина комментария не должна\n    превышать 140 символов. Текущая длина сообщения "+e.length):u.setCustomValidity("")}(u.value)}),o.addEventListener("invalid",function(e){!function(e){e.style.border="2px solid #ff0000"}(e.target)},!0),o.addEventListener("input",function(e){!function(e){e.style.border=""}(e.target)})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){if(e){var r=e.name.toLowerCase();if(t.some(function(e){return r.endsWith(e)})){var o=new FileReader;o.addEventListener("load",function(){n(o.result)}),o.readAsDataURL(e)}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initialize=t.filterPhotos=void 0;var r=i(n(1)),o=i(n(0));function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var u=document.querySelector(".img-filters"),c=u.querySelectorAll(".img-filters__button"),l=void 0,a={"filter-recommended":function(e){return e},"filter-popular":function(e){return e.slice().sort(function(e,t){return t.likes-e.likes})},"filter-discussed":function(e){return e.slice().sort(function(e,t){return t.comments.length-e.comments.length})},"filter-random":o.getRandomArray},s=t.filterPhotos=function(e,t){var n=e.target;if(n!==l){!function(e){l&&l.classList.remove("img-filters__button--active"),e.classList.add("img-filters__button--active"),l=e}(n);var i=a[n.id](t);o.debounce(function(){return r.updatePhotos(i)},500)}};t.initialize=function(e){u.classList.remove("img-filters--inactive"),l=c[0],Array.from(c).forEach(function(t){return t.addEventListener("click",function(t){s(t,e)})})}}]);
//# sourceMappingURL=bundle.js.map