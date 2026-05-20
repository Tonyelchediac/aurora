// Remove any hardcoded header if it already exists to avoid duplication
const existingHeader = document.querySelector("header");
if (existingHeader) {
    existingHeader.remove();
}

const bodyHeader = document.body;

// Add class to body for CSS layout adjustments
bodyHeader.classList.add("has-sidebar");

const indexHeader = `
    <aside class="sidebar-nav">
        <div class="sidebar-brand">
            <span class="logo-icon"><i class='bx bxs-bolt-circle'></i></span>
            <span class="logo-text">Aurora</span>
        </div>
        <nav class="nav-menu">
            <ul>
                <li>
                    <a href="index.html" class="nav-link" id="nav-home">
                        <i class='bx bx-home-alt'></i>
                        <span class="link-text">Home</span>
                    </a>
                </li>
                <li>
                    <a href="carTrack.html" class="nav-link" id="nav-track">
                    <i class='bx bx-map-pin'></i>
                    <span class="link-text">Track Page</span>
                    </a>
                </li>
                <li>
                    <a href="card.html" class="nav-link" id="nav-card">
                    <i class='bx bx-shopping-bag'></i>
                    <span class="link-text">Card</span>
                    </a>
                </li>
                <li>
                    <a href="login.html" class="nav-link" id="nav-card">
                        <i class='bx bx-user'></i>
                        <span class="link-text">Log In</span>
                    </a>
                </li>
            </ul>
        </nav>
    </aside>
`;

bodyHeader.insertAdjacentHTML("afterbegin", indexHeader);

// Active link highlighting logic
const currentPath = window.location.pathname;
if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('/') || (!currentPath.includes('.html') && !currentPath.includes('Account') && !currentPath.includes('Track') && !currentPath.includes('card') && !currentPath.includes('car_details'))) {
    document.getElementById('nav-home')?.classList.add('active');
} else if (currentPath.includes('userAccount.html')) {
    document.getElementById('nav-account')?.classList.add('active');
} else if (currentPath.includes('carTrack.html')) {
    document.getElementById('nav-track')?.classList.add('active');
} else if (currentPath.includes('card.html')) {
    document.getElementById('nav-card')?.classList.add('active');
}