document.addEventListener("DOMContentLoaded", () => {
    const submitPost = document.getElementById("post-form-submit");
    const updatePost = document.getElementById("post-form-update");
    const user_id = document.getElementById("user_id");
    const errorMessage = document.getElementById("form-submit-error");
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const category = document.getElementById("category");
    const old_title = title.value;
    const old_content = content.value;
    const old_category = category.value;
    const createdBy = document.getElementById("created_by");
    const post_id = document.getElementById("post_id");
    const postForm = document.getElementById("post-form");

    if (submitPost) {
        submitPost.addEventListener("click", (event) => {
            errorMessage.innerHTML = '';
            can_submit = true;
            
                if (!user_id) {
                    errorMessage.innerText = "You must be logged in to submit a post.";
                    scrollToTop();
                    can_submit = false;
                    event.preventDefault();
                } 
        
                if (!title || !content || !category) {
                    errorMessage.innerText = "All fields are required.";
                    scrollToTop();
                    can_submit = false;
                    event.preventDefault();
                }

            if (!can_submit) {
                event.preventDefault();
            } else {
                postForm.method = "POST";
                postForm.action = "/submit-post";
                postForm.submit();
            }
        });
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    if(updatePost){
        updatePost.addEventListener("click", (event) => {
            errorMessage.innerHTML = '';
            can_submit = true;

            if (!user_id) {
                errorMessage.innerText = "You must be logged in to submit a post.";
                scrollToTop();
                can_submit = false;
                event.preventDefault();
            } else if (user_id.value !== createdBy.value) {
                errorMessage.innerText = "You cannot update a post created by someone else.";
                scrollToTop();
                can_submit = false;
                event.preventDefault();
            }
            
            if (!title || !content || !category) {
                errorMessage.innerText = "All fields are required.";
                scrollToTop();
                can_submit = false;
                event.preventDefault();
            }
            
            if (title.value === old_title && content.value === old_content && category.value === old_category) {
                errorMessage.innerText = "No changes detected.";
                scrollToTop();
                can_submit = false;
                event.preventDefault();
            } else {
                const formData = new FormData(document.getElementById("post-form"));
                url = "/submit-post/" + post_id.value;
                fetch(url, {
                    method: "PUT",
                    body: formData
                })
                .then(response => response.json()) 
                .then(data => {
                    if (data.redirect_url) {
                        window.location.href = data.redirect_url; 
                    }
                })
                .catch(error => console.error('Error:', error));
            } 
        });
    }
});
