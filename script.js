const chapters = [...document.querySelectorAll(".chapter")];
const counter = document.getElementById("chapterNow");
const total = document.getElementById("chapterTotal");
const startBtn = document.getElementById("startBtn");
const yesModal = document.getElementById("yesModal");
const noModal = document.getElementById("noModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

total.textContent = String(chapters.length).padStart(2,"0");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const index = entry.target.dataset.index;
      if(index) counter.textContent = String(index).padStart(2,"0");
    }
  });
},{threshold:.35});

chapters.forEach(chapter => observer.observe(chapter));

startBtn.addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({behavior:"smooth"});
});

function openModal(modal){
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}

function closeModal(modal){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}

yesBtn.addEventListener("click",()=>openModal(yesModal));
noBtn.addEventListener("click",()=>openModal(noModal));

document.querySelectorAll("[data-close]").forEach(button=>{
  button.addEventListener("click",()=>{
    closeModal(document.getElementById(button.dataset.close));
  });
});

document.querySelectorAll(".modal").forEach(modal=>{
  modal.addEventListener("click",event=>{
    if(event.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown",event=>{
  if(event.key === "Escape"){
    closeModal(yesModal);
    closeModal(noModal);
  }
});

copyBtn.addEventListener("click",async()=>{
  try{
    await navigator.clipboard.writeText(":P");
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),1600);
  }catch{
    copyBtn.textContent=":P";
  }
});

const reveal = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("seen");
  });
},{threshold:.15});

document.querySelectorAll(".track-info,.reveal-card,.question-wrap").forEach(el=>reveal.observe(el));
