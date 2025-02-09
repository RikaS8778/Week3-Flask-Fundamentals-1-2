//
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const popupOverlay = document.getElementById("popupOverlay");
    const closePopup = document.getElementById("closePopup");
    const logoutButton = document.getElementById("logout-button");
    const categorySelector = document.getElementById("category-selector");
  
    // Show the popup: Login
    if(loginButton){
        loginButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent page reload
            popupOverlay.classList.remove("hidden");
        });
    }

  
    // Close the popup: Login
    closePopup.addEventListener("click", () => {
      popupOverlay.classList.add("hidden");
    });
  
    // Close the popup when clicking outside: Login
    popupOverlay.addEventListener("click", (event) => {
      if (event.target === popupOverlay) {
        popupOverlay.classList.add("hidden");
      }
    });

    if(logoutButton){
        logoutButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent page reload
            window.location.href = "/logout";
        });
    }


    // Close the alert
    window.onload = function() {
        // if alert exists
        var flashMessage = document.getElementById('alert');
        if (flashMessage) {
            setTimeout(function() {
                flashMessage.remove();
            }, 5000);  // 5 seconds
        }   
    }

    if(categorySelector){
        categorySelector.addEventListener('change', function() {
            var category = this.value;
            console.log(category);
            if(category != 'all') {
                var url = '/posts?category_id=' + category;
                window.location.href = url;
            } else {
                window.location.href = '/posts';
            }
            
        });
    }

});