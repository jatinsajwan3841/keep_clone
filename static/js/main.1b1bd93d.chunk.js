(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{10:function(e,t,n){},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n.n(c),r=n(11),o=n.n(r),s=(n(17),n(3)),i=n(9),l=n(8),j=(n(10),n(12)),u=n(1);function d(e){var t=e.layout,n=a.a.useState(""),c=Object(s.a)(n,2),r=c[0],o=c[1],d=a.a.useState([]),b=Object(s.a)(d,2),O=b[0],x=b[1],h=a.a.useState(!1),f=Object(s.a)(h,2),m=f[0],p=f[1];return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("form",{children:Object(u.jsx)("textarea",{rows:m?3:1,value:r,onClick:function(){return p(!0)},onChange:function(e){return o(e.target.value)},onBlur:function(){if(""!=r){var e={id:~~(1e3*Math.random()),value:r,isCompleted:!1};x([].concat(Object(l.a)(O),[e])),o(""),p(!1)}else p(!1)},placeholder:"Take your note..."})}),O!=[]?Object(u.jsx)("ul",{className:t?"container":"container containerf",children:O.map((function(e){return Object(u.jsx)("li",{className:t?"noteholder":"noteholder noteholderf",children:Object(u.jsxs)("div",{contentEditable:!0,className:t?"textarea":"textarea textareaf",children:[Object(u.jsx)("span",{className:e.isCompleted?"cross":"",children:e.value}),Object(u.jsxs)("span",{className:"tools",children:[Object(u.jsx)("button",{className:"btn",onClick:function(){return t=e.id,void x(O.filter((function(e){return e.id!=t})));var t},children:Object(u.jsx)(j.a,{})}),Object(u.jsx)("input",{className:"btn",type:"checkbox",id:"completed",onClick:function(){return function(e){var t=O.findIndex((function(t){return t.id==e})),n=Object(l.a)(O);n[t]=Object(i.a)(Object(i.a)({},n[t]),{},{isCompleted:!0}),x(n)}(e.id)}})]})]})},e.id)}))}):null]})}var b=n(7);function O(e){var t=e.layt,n=e.layout;return Object(u.jsxs)("header",{children:[Object(u.jsx)("img",{src:"https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"}),Object(u.jsx)("p",{children:"Keep clone"}),Object(u.jsx)("button",{className:"hbtn",onClick:function(){return t()},children:n?Object(u.jsx)(b.b,{}):Object(u.jsx)(b.a,{})})]})}var x=function(){var e=a.a.useState(!0),t=Object(s.a)(e,2),n=t[0],c=t[1];return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(O,{layt:function(){c(!n)},layout:n}),Object(u.jsx)(d,{layout:n})]})};o.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(x,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.1b1bd93d.chunk.js.map