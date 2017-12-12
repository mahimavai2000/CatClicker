/* ======= Model ======= */

var model = {
	currentCat: null,
	adminShowing: false,
	cats: [
	{
		catName: 'Cat 1',
		catImage: 'img/cat1.jpg',
		clickCount: 0

	},
	{
		catName: 'Cat 2',
		catImage: 'img/cat2.jpg',
		clickCount: 0

	},
	{
		catName: 'Cat 3',
		catImage: 'img/cat3.jpg',
		clickCount: 0

	},
	{
		catName: 'Cat 4',
		catImage: 'img/cat4.jpg',
		clickCount: 0

	},
	{
		catName: 'Cat 5',
		catImage: 'img/cat5.jpg',
		clickCount: 0

	}
	]
};

/* ======= Octopus ======= */
var octopus = {
	init: function() {
		// set our current cat to the first one in the list
		model.currentCat = model.cats[0];
		// tell our views to initialize
		catView.init();
		catListView.init();
		adminView.init();
	},
// set the currently-selected cat to the object passed in
	getCats: function() {
		return model.cats;
	},
	setCurrentCat: function(cat) {
		model.currentCat=cat;		
	},
	getCurrentCat: function() {
		return model.currentCat;
	},
// increments the counter for the currently-selected cat
	clickCounter: function() {
		model.currentCat.clickCount++;
		catView.render();
	},
	adminClicked: function() {
		console.log("entered octopus");
		model.adminShowing = true;
		adminView.render(model.adminShowing);		
	},
	formCancel: function() {
		console.log("entered adminCancel");
		model.adminShowing = false;
		adminView.render(model.adminShowing);		
	},
	setEnteredCatDetails: function(inputCatName,inputClicks) {
		console.log("setEnteredCatDetails");
		model.currentCat.catName=inputCatName;
		model.currentCat.clickCount=inputClicks;			
	},
	getEnteredCatDetails: function() {
		console.log("getEnteredCatDetails");
		console.log(model.currentCat.catName,model.currentCat.clickCount);
		return model.currentCat.catName,model.currentCat.clickCount;
	}

};

/* ======= View ======= */
var catView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.catDetails = document.getElementById('cat-details');
		this.name = document.getElementById('cat-name');
		this.image = document.getElementById('cat-image');
		this.noOfClicks = document.getElementById('clicks-counter');

		// on click, increment the current cat's counter
		this.image.addEventListener('click', function() {
			octopus.clickCounter();
		});
		// render this view (update the DOM elements with the right values)
		this.render();
	},
	render: function() {
		// update the DOM elements with values from the current cat
		
		var currentCatDetails = octopus.getCurrentCat();
		this.name.textContent = currentCatDetails.catName;
		this.image.src = currentCatDetails.catImage;
		this.noOfClicks.textContent = currentCatDetails.clickCount;

	}
};

var catListView = {
	init: function() {
		 // store the DOM element for easy access later
		this.catListItem =document.getElementById('cat-list');
		  // render this view (update the DOM elements with the right values)
        this.render();      
	},
	render: function() {
		var getCat,i,listElement,cat;
		// get the cats we'll be rendering from the octopus
        getCat = octopus.getCats();
        // empty the cat list
        this.catListItem.innerHtml='';

        // loop over the cats
        for (var i = 0; i < getCat.length; i++) {
        	
        	// this is the cat we're currently looping over
        	cat=getCat[i];

            // make a new cat list item and set its text
            listElement = document.createElement('li');
            listElement.textContent=cat.catName;
         
            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            listElement.addEventListener('click', (function(clickedCat) {
            	
            	return function() {
            	 octopus.setCurrentCat(clickedCat);
            	 catView.render();
            	};
            })(cat));

            // finally, add the element to the list
        	this.catListItem.appendChild(listElement);
        }
     
    }
};

var adminView = {
	init: function() {
		// store pointers to our DOM elements for easy access later
		this.adminDetails = document.getElementById('admin-details');
		this.adminButton = document.getElementById('admin');
		this.adminForm = document.getElementById('admin-form');
		this.inputCatName = document.getElementById('input-catName');		
		this.inputClicks = document.getElementById('input-clicks');
		this.formSubmit = document.getElementById('submit');
		this.formCancel = document.getElementById('cancel');

		// on click, open the admin form
		this.adminButton.addEventListener('click', function() {
			console.log("adminclicked");
			octopus.adminClicked();		
		});
		
		// on click of submit button

		this.formSubmit.addEventListener('click', (function(setEenteredCatName,setEnteredClicks) {
			console.log("submitted");
			event.preventDefault();
			//store the input values from admin form (catName and Clicks)
			this.enteredCatName = $('input[name="Cat Name"]').val();			
			this.enteredClicks = $('input[name="Clicks"]').val();
			console.log(this.enteredCatName,this.enteredClicks);					
			octopus.setEnteredCatDetails(this.enteredCatName,this.enteredClicks);
			catView.render();
			octopus.formCancel();
			      
			
		}));

		// on click, cancel/clear the admin form
		this.formCancel.addEventListener('click', function() {
			octopus.formCancel();
		});

		// render this view (update the DOM elements with the right values)
		this.render();
	},
	render: function(value) {
		console.log("enetered render");
		// get the cats we'll be rendering from the octopus
        //var getAdminClicked = octopus.adminClicked();
        //console.log(getAdminClicked);
        if (value===true) {
        	this.adminForm.style="display:block;";        	
        }

        if (value===false) {
        	this.adminForm.style="display:none;";        	
        }
        //getAdminClicked=false;
        value = false;
     }
};    
  
//Initiate octopus
octopus.init();
