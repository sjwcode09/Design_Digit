window.addEventListener("load", function(){
	let n=0;
	let t=0;
	let topPos=0;

	let header=document.getElementById("header");
	let menuArea=header.firstElementChild;

	let gnb=document.getElementById("gnb");
	let gnbList=gnb.firstElementChild.children;

	gnbList[n].firstElementChild.classList.add("on");

	let mobileGnb=document.getElementById("m_gnb");
	let mobileGnbList=m_gnb.firstElementChild.children;

	let section=document.querySelectorAll("section");

	let pageList=[header];

	for(let i=0; i<section.length; i++){
		pageList.push(section[i]);
	}

	let btnTop=document.querySelector(".btn_top");

	let mobile, tab, dim;

	for(let i=0; i<menuArea.children.length; i++){
		if(menuArea.children[i].className == "mobile"){
			mobile=menuArea.children[i];
		}
		else if(menuArea.children[i].className == "tab"){
			tab=menuArea.children[i];
		}
		else if(menuArea.children[i].className == "dim"){
			dim=menuArea.children[i];
		}
	}

	window.addEventListener("scroll", function(){
		t=window.scrollY;

		if(t < pageList[1].offsetTop){
			n=0;
		}
		else if(t < pageList[2].offsetTop){
			n=1;
		}
		else if(t < pageList[3].offsetTop){
			n=2;
		}
		else if(t < pageList[4].offsetTop){
			n=3;

			if(window.innerHeight+t == document.body.scrollHeight){
				n=4;
			}
		}
		else{
			n=4;
		}

		for(let i=0; i<gnbList.length; i++){
			if(i == n){
				if(gnbList[i].firstElementChild.classList.contains("on") == false){
					gnbList[i].firstElementChild.classList.add("on");
					// pageList[i].classList.add("active");
				}
			}
			else{
				if(gnbList[i].firstElementChild.classList.contains("on") == true){
					gnbList[i].firstElementChild.classList.remove("on");
					// pageList[i].classList.remove("active");
				}
			}
		}

		if(n == 0){
			if(menuArea.classList.contains("active") == true){
				menuArea.classList.remove("active");
				btnTop.classList.remove("active");
			}
		}
		else{
			if(menuArea.classList.contains("active") == false){
				menuArea.classList.add("active");
				btnTop.classList.add("active");
			}
		}
	});

	window.addEventListener("resize", function(){
		w=window.innerWidth;

		if(w > 720){
			if(mobile.classList.contains("active")){
				mobile.classList.remove("active");
				tab.classList.remove("active");
				dim.classList.remove("active");
			}
		}
	});

	tab.addEventListener("click", function(e){
		e.preventDefault();

		mobile.classList.toggle("active");
		tab.classList.toggle("active");
		dim.classList.toggle("active");
	});

	dim.addEventListener("click", function(){
		mobile.classList.remove("active");
		tab.classList.remove("active");
		dim.classList.remove("active");
	});

	btnTop.addEventListener("click", function(e){
		e.preventDefault();

		gsap.to(window, {scrollTo: 0, duration: 0.4});
	});

	for(let i=0; i<gnbList.length; i++){
		gnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			n=i;
			topPos=pageList[n].offsetTop;

			gsap.to(window, {scrollTo: topPos, duration: 0.4});
		});

		mobileGnbList[i].addEventListener("click", function(e){
			e.preventDefault();

			n=i;
			topPos=pageList[n].offsetTop;

			mobile.classList.remove("active");
			tab.classList.remove("active");
			dim.classList.remove("active");

			gsap.to(window, {scrollTo: topPos, duration: 0.4, delay: 0.4});
		});
	}

	AOS.init({
		easing: "ease-in-out-sine",
		duration: 700,
		once: true
	});
});