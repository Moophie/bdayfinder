window.addEventListener("load",e=>{var t=localStorage.getItem("token");fetch("/users/getUserFromToken",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({token:t})}).then(e=>e.json()).then(e=>{let t=document.querySelector("#currentUsername"),n=document.querySelector("#currentBirthday");t.innerHTML=e.data.user.username;let r=new Date(e.data.user.birthday);e=`${r.getDate()} ${r.toLocaleString("en-us",{month:"long"})}`;return n.innerHTML=e,birthdayDayMonth=r.getMonth()+1+"/"+r.getDate()}).then(a=>{let l=new Date,d=l.getFullYear(),u=new Date(`${a}/${d}`).getTime();setInterval(function(){l=(new Date).getTime();let e=u-l;e<0&&(u=new Date(`${a}/${d+1}`).getTime(),e=u-l);var t=Math.floor(e/864e5),n=Math.floor(e%864e5/36e5),r=Math.floor(e%36e5/6e4),o=Math.floor(e%6e4/1e3);if(364===t){document.querySelector("#countdown").innerHTML="ITS YOUR BIRTHDAY!",document.querySelector(".header").innerHTML="",document.querySelectorAll(".text").forEach(e=>{e.innerHTML=""});let e=document.querySelector(".content--index");e.classList.add("happyBirthday")}else document.querySelector("#countdown").innerHTML=t+"d "+n+"h "+r+"m "+o+"s "},1e3)})});