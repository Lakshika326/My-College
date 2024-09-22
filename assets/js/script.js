$(document).ready(function () {
    const content = {
        navigation: [
            { href: "#home", text: "Home" },
            { href: "#our-story", text: "Our Story" },
            { href: "#memories", text: "Memories" },
            { href: "#reflections", text: "Reflections" },
            { href: "#contact", text: "Contact" }
        ],
        footerLinks: [
            { href: "#privacy-policy", text: "Privacy Policy" },
            { href: "#terms-of-service", text: "Terms of Service" }
        ]
    };

    // Populate navigation
    content.navigation.forEach(item => {
        $('header nav ul').append(`<li><a href="${item.href}">${item.text}</a></li>`);
    });

    // Populate footer links
    content.footerLinks.forEach(item => {
        $('footer nav').append(`<a href="${item.href}">${item.text}</a> | `);
    });

    // Array of image sources for the slider
    const images = [
        { src: "assets/img/img1.jpeg", alt: "Memory 1" },
        { src: "assets/img/img2.jpeg", alt: "Memory 2" },
        { src: "assets/img/img3.jpeg", alt: "Memory 3" },
        { src: "assets/img/img4.jpeg", alt: "Memory 4" },
        { src: "assets/img/img5.jpeg", alt: "Memory 5" },
    ];

    // Inject images into the slider
    const slider = $(".slider");
    const totalImages = images.length;
    const angleStep = 360 / totalImages;
    const radius = 200; // Distance from center of rotation

    images.forEach((image, index) => {
        const angle = angleStep * index;
        const translateZ = radius;

        slider.append(
            `<img src="${image.src}" alt="${image.alt}" style="transform: rotateY(${angle}deg) translateZ(${translateZ}px);">`
        );
    });

    // Handle user input and image uploads
    $('#input-form').on('submit', function(event) {
        event.preventDefault();

        const phrase = $('#user-phrase').val();
        const imageFile = $('#user-image')[0].files[0];

        if (phrase || imageFile) {
            const reader = new FileReader();

            if (imageFile) {
                reader.onload = function(e) {
                    const imgElement = `<img src="${e.target.result}" alt="User Image">`;
                    const itemElement = `<li>${phrase ? `<p>${phrase}</p>` : ''} ${imgElement}</li>`;
                    $('#cart-items').append(itemElement);
                };
                reader.readAsDataURL(imageFile);
            } else {
                const itemElement = `<li><p>${phrase}</p></li>`;
                $('#cart-items').append(itemElement);
            }

            // Clear the form
            $('#input-form')[0].reset();
        }
    });

    $('a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });
});
