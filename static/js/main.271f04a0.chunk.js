(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},8:function(e,t,n){e.exports=n(9)},9:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(2),s=n(4),o=n(3),i=n(5),c=n(0),u=n.n(c),l=n(7),h=n.n(l),v=(n(15),["white","red","green","blue","cyan","magenta","yellow"]);function f(e,t){return t<0||t>=e.length}function m(e){return u.a.createElement("button",{className:"square",style:{background:v[e.value]}})}var p=function(e){function t(){return Object(r.a)(this,t),Object(s.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(a.a)(t,[{key:"renderSquare",value:function(e){return u.a.createElement(m,{value:e})}},{key:"renderRow",value:function(e){var t=this;return u.a.createElement("div",{className:"board-row"},e.map(function(e){return t.renderSquare(e)}))}},{key:"render",value:function(){var e=this;return u.a.createElement("div",null,this.props.rows.map(function(t){return e.renderRow(t)}))}}]),t}(u.a.Component),k=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(s.a)(this,Object(o.a)(t).call(this,e))).state={rows:[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],tetris:{blocks:[],value:0}},n}return Object(i.a)(t,e),Object(a.a)(t,[{key:"startLoop",value:function(){for(var e=this,t=this.state.rows,n=0;n<t.length;++n)for(var r=0;r<t[n].length;++r)t[n][r]=0;this.setState({rows:t}),this.gameLoop=setInterval(function(){return e.tick()},100)}},{key:"componentDidMount",value:function(){this.startLoop()}},{key:"endLoop",value:function(){clearInterval(this.gameLoop)}},{key:"componentWillUnmount",value:function(){this.endLoop()}},{key:"onNewGame",value:function(){this.gameLoop&&this.endLoop(),this.startLoop()}},{key:"applyTetris",value:function(e,t,n){for(var r=0;r<t.length;++r)e[t[r][0]][t[r][1]]=n}},{key:"isEmpty",value:function(e,t,n){return 0===e[t][n]}},{key:"isRepeat",value:function(e,t,n,r){for(var a=0;a<e.length;++a)if(t!==a&&e[t][0]+n===e[a][0]&&e[t][1]+r===e[a][1])return!0;return!1}},{key:"canMove",value:function(e,t,n,r){for(var a=0;a<t.length;++a){if(f(e,t[a][0]+n))return 0;if(f(e[t[a][0]+n],t[a][1]+r))return 2;if(!this.isRepeat(t,a,n,r)&&!this.isEmpty(e,t[a][0]+n,t[a][1]+r))return-1}return 1}},{key:"onMoveTetris",value:function(e,t){var n=this.state.rows.slice(),r=Object.assign({},this.state.tetris);switch(this.canMove(n,r.blocks,e,t)){case 2:t=0;case 1:this.applyTetris(n,r.blocks,0);for(var a=0;a<r.blocks.length;++a)r.blocks[a][0]+=e,r.blocks[a][1]+=t;return this.applyTetris(n,r.blocks,r.value),this.setState({rows:n,tetris:r}),!0;default:return!1}}},{key:"moveTetris",value:function(e,t){this.onMoveTetris(e,t)||this.spawnTetris()}},{key:"moveTetrisRecursive",value:function(e,t){for(;this.onMoveTetris(e,t););this.spawnTetris()}},{key:"spawnTetris",value:function(){var e,t,n={blocks:[[0,3],[0,4],[0,5],[0,6]],value:(e=1,t=v.length,Math.floor(Math.random()*(t-e))+e)},r=this.state.rows.slice();this.canMove(r,n.blocks,0,0)>0?(this.applyTetris(r,n.blocks,n.value),this.setState({rows:r,tetris:n})):this.endLoop()}},{key:"tick",value:function(){0===this.state.tetris.blocks.length?this.spawnTetris():this.moveTetris(1,0)}},{key:"handleKeyPress",value:function(e){switch(console.log(e.key),e.key){case"ArrowLeft":this.moveTetris(0,-1);break;case"ArrowUp":break;case"ArrowRight":this.moveTetris(0,1);break;case"ArrowDown":this.moveTetris(1,0);break;case" ":this.moveTetrisRecursive(1,0)}}},{key:"render",value:function(){var e=this;return u.a.createElement("div",{className:"game"},u.a.createElement("div",{className:"game-board",onKeyDown:function(t){e.handleKeyPress(t)}},u.a.createElement(p,{rows:this.state.rows}),u.a.createElement("button",{onClick:function(){return e.onNewGame()}},"New Game")),u.a.createElement("div",{className:"game-info"},u.a.createElement("div",null),u.a.createElement("ol",null)))}}]),t}(u.a.Component);h.a.render(u.a.createElement(k,null),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.271f04a0.chunk.js.map