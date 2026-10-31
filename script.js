"use strict";
document.getElementById('year').textContent=new Date().getFullYear();
const dialog=document.getElementById('image-dialog');
let trigger;
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{trigger=button;const image=document.getElementById('expanded-image');image.src=button.dataset.image;image.alt=button.querySelector('img').alt;document.getElementById('image-caption').textContent=button.dataset.caption;dialog.showModal();}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('close',()=>trigger?.focus());
