export const KEYS={a:'M',s:'E',d:'C',f:'A'};
export const TYPES=['M','E','C','A'];
export const CHARGE_MS=420;
export function availableTypes(score){return score<8?['E']:TYPES;}
export function makeShot(type,heldMs,x,y,aimX,aimY){
 const charged=heldMs>=CHARGE_MS, angle=Math.atan2(aimY-y,aimX-x);
 return {type,x,y,vx:Math.cos(angle)*560,vy:Math.sin(angle)*560,r:charged?15:5,charged,bounces:charged?4:0,ttl:charged?5:2.2};
}
export function stepShot(b,dt,w,h){
 b.x+=b.vx*dt;b.y+=b.vy*dt;b.ttl-=dt;
 if(b.charged&&b.bounces>0){
  if(b.x<b.r||b.x>w-b.r){b.x=Math.max(b.r,Math.min(w-b.r,b.x));b.vx*=-1;b.bounces--;}
  if(b.y<b.r||b.y>h-b.r){b.y=Math.max(b.r,Math.min(h-b.r,b.y));b.vy*=-1;b.bounces--;}
 }
 return b.ttl>0&&b.x>=-b.r&&b.x<=w+b.r&&b.y>=-b.r&&b.y<=h+b.r;
}
export function collides(b,t){return Math.hypot(b.x-t.x,b.y-t.y)<=b.r+t.r;}
export function resolveHit(b,t){return collides(b,t)?(b.type===t.type?'destroy':'wrong'):null;}
