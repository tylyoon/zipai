// Music & Sheet Music Management
let musicItems = JSON.parse(localStorage.getItem('musicItems')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderMusicList();
    setupMusicForm();
    setupContactForm();
    setupNavbar();
});

// Setup Music Form
function setupMusicForm() {
    const musicForm = document.getElementById('musicForm');
    if (musicForm) {
        musicForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addMusicItem();
        });
    }
}

// Add Music Item
function addMusicItem() {
    const title = document.getElementById('musicTitle').value.trim();
    const type = document.getElementById('musicType').value;
    const url = document.getElementById('musicUrl').value.trim();
    const description = document.getElementById('musicDescription').value.trim();

    if (!title || !url) {
        alert('제목과 URL을 입력해주세요.');
        return;
    }

    const musicItem = {
        id: Date.now(),
        title: title,
        type: type,
        url: url,
        description: description,
        createdAt: new Date().toISOString()
    };

    musicItems.push(musicItem);
    saveMusicItems();
    renderMusicList();
    
    // Reset form
    document.getElementById('musicForm').reset();
    
    // Show success message
    showNotification('음악/악보가 추가되었습니다.');
}

// Delete Music Item
function deleteMusicItem(id) {
    if (confirm('정말 삭제하시겠습니까?')) {
        musicItems = musicItems.filter(item => item.id !== id);
        saveMusicItems();
        renderMusicList();
        showNotification('음악/악보가 삭제되었습니다.');
    }
}

// Save Music Items to LocalStorage
function saveMusicItems() {
    localStorage.setItem('musicItems', JSON.stringify(musicItems));
}

// Render Music List
function renderMusicList() {
    const musicList = document.getElementById('musicList');
    const emptyMessage = document.getElementById('emptyMessage');
    
    if (!musicList) return;

    if (musicItems.length === 0) {
        musicList.innerHTML = '';
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';
    
    musicList.innerHTML = musicItems.map(item => `
        <div class="col-md-6 col-lg-4 fade-in">
            <div class="card music-card h-100">
                <button class="delete-btn" onclick="deleteMusicItem(${item.id})" title="삭제">
                    <i class="bi bi-trash"></i>
                </button>
                <span class="music-type-badge ${item.type === 'audio' ? 'badge-audio' : 'badge-sheet'}">
                    ${item.type === 'audio' ? '음악' : '악보'}
                </span>
                <div class="card-body">
                    <div class="music-icon">
                        <i class="bi ${item.type === 'audio' ? 'bi-music-note-beamed' : 'bi-file-earmark-music'}"></i>
                    </div>
                    <h5 class="card-title">${escapeHtml(item.title)}</h5>
                    ${item.description ? `<p class="card-text text-muted">${escapeHtml(item.description)}</p>` : ''}
                    <a href="${escapeHtml(item.url)}" target="_blank" class="btn btn-outline-primary btn-sm mt-2">
                        <i class="bi ${item.type === 'audio' ? 'bi-play-circle' : 'bi-download'}"></i>
                        ${item.type === 'audio' ? '듣기' : '보기/다운로드'}
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree will handle the submission
            // Show success message after submission
            setTimeout(() => {
                formSuccess.classList.remove('d-none');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('d-none');
                }, 5000);
            }, 1000);
        });
    }
}

// Setup Navbar
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close navbar on mobile when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, #2c3e50, #34495e)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }
    });
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = `
        top: 80px;
        right: 20px;
        z-index: 9999;
        min-width: 250px;
        animation: slideIn 0.3s ease-out;
    `;
    notification.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
