const productCatalog = [
  { id: 'asus-rog-strix-g16', name: 'ASUS ROG Strix G16', image: 'images/best-gaming-laptop.png', price: '₹1,29,990', brand: 'ASUS', category: 'Laptops', rating: 4.8, description: 'A high-performance gaming laptop with vivid visuals and strong cooling for demanding sessions.', pros: ['Excellent gaming performance', 'Bright display', 'Strong cooling'], cons: ['Bulky for travel', 'Battery life is moderate'], specifications: { processor: 'Intel Core i7', graphics: 'NVIDIA RTX 4060', memory: '16GB DDR5', storage: '1TB SSD' }, performance: 'Fast enough for modern AAA games and multitasking without feeling sluggish.', display: 'The screen is vivid and responsive, which makes gameplay and media work feel polished.', battery: 'Battery life is acceptable for a gaming laptop if you keep performance in check.', buildQuality: 'The chassis feels sturdy and premium, with a more serious look than many gaming-focused laptops.', whoShouldBuy: 'Gamers and creative users who want strong performance in a laptop that still feels premium.', verdict: 'A compelling pick when you want substantial power without giving up a polished desktop feel.', affiliate: '#' },
  { id: 'dell-xps-15', name: 'Dell XPS 15', image: 'images/best-business-laptop.png', price: '₹1,89,990', brand: 'Dell', category: 'Laptops', rating: 4.7, description: 'A premium creator laptop with a sleek chassis and excellent display quality for work and media.', pros: ['Excellent build', 'High-resolution screen', 'Great for editing'], cons: ['Expensive', 'Limited upgradeability'], specifications: { processor: 'Intel Core i7', graphics: 'Intel Iris Xe', memory: '16GB RAM', storage: '512GB SSD' }, performance: 'Smooth and responsive for productivity, creative work and everyday multitasking.', display: 'The bright display feels sharp and refined, with plenty of screen real estate.', battery: 'Solid battery life for a premium ultrabook.', buildQuality: 'Feels minimal, sturdy and beautifully finished.', whoShouldBuy: 'Professionals and creators who want a premium notebook that looks calm and refined.', verdict: 'An excellent blend of style, portability and real-world productivity.', affiliate: '#' },
  { id: 'hp-omen-16', name: 'HP Omen 16', image: 'images/best-gaming-laptop.png', price: '₹1,24,990', brand: 'HP', category: 'Laptops', rating: 4.6, description: 'A strong gaming laptop with a balanced feature set and dependable value for casual and competitive play.', pros: ['Good value', 'Comfortable keyboard', 'Solid thermals'], cons: ['Display is not class-leading', 'Can be a bit bulky'], specifications: { processor: 'AMD Ryzen 7', graphics: 'NVIDIA RTX 4070', memory: '16GB RAM', storage: '1TB SSD' }, performance: 'Handles modern games and multitasking smoothly for most users.', display: 'The display is bright and responsive enough for a comfortable gaming experience.', battery: 'Reasonable performance for a gaming notebook.', buildQuality: 'Feels solid, practical and durable without looking overly flashy.', whoShouldBuy: 'Gamers who want a balanced machine without spending flagship money.', verdict: 'A sensible choice if you want strong performance at an approachable premium.', affiliate: '#' },
  { id: 'lenovo-legion-5', name: 'Lenovo Legion 5', image: 'images/best-gaming-laptop.png', price: '₹1,09,990', brand: 'Lenovo', category: 'Laptops', rating: 4.5, description: 'A practical and powerful laptop with strong graphics performance and excellent thermal management.', pros: ['Excellent cooling', 'Comfortable keyboard', 'Good value'], cons: ['Design is more functional than luxurious'], specifications: { processor: 'AMD Ryzen 7', graphics: 'NVIDIA RTX 4060', memory: '16GB RAM', storage: '512GB SSD' }, performance: 'A reliable performer for gaming, content work and multitasking.', display: 'The screen is sharp and pleasing for daily use.', battery: 'Good enough for a mainstream performance laptop.', buildQuality: 'Built to be durable and dependable for daily use.', whoShouldBuy: 'Players and students who want a capable machine that stays practical.', verdict: 'One of the better value picks in the mid-range gaming laptop category.', affiliate: '#' },
  { id: 'acer-predator-helios-300', name: 'Acer Predator Helios 300', image: 'images/best-gaming-laptop.png', price: '₹1,19,990', brand: 'Acer', category: 'Laptops', rating: 4.6, description: 'A gaming-focused laptop that combines strong performance with a more accessible premium feel.', pros: ['High-end specs', 'Good cooling', 'Solid display'], cons: ['Can run warm under load'], specifications: { processor: 'Intel Core i7', graphics: 'NVIDIA RTX 4070', memory: '16GB RAM', storage: '1TB SSD' }, performance: 'Excellent for modern games and heavier creative workloads.', display: 'The display is lively and fast enough for immersive play.', battery: 'Acceptable for a performance-oriented gaming laptop.', buildQuality: 'Feels sturdy and purposeful in everyday use.', whoShouldBuy: 'Gamers who want strong hardware at a slightly more approachable price.', verdict: 'A strong performance-first option if you want serious power without overcomplicating the setup.', affiliate: '#' },
  { id: 'msi-stealth-14', name: 'MSI Stealth 14', image: 'images/best-gaming-laptop.png', price: '₹1,49,990', brand: 'MSI', category: 'Laptops', rating: 4.7, description: 'A slim performance laptop that looks polished while still delivering strong computing power.', pros: ['Portable', 'Capable hardware', 'Premium finish'], cons: ['Can feel expensive for its size'], specifications: { processor: 'Intel Core Ultra 7', graphics: 'NVIDIA RTX 4070', memory: '16GB RAM', storage: '1TB SSD' }, performance: 'Handles gaming and work smoothly in a thinner chassis.', display: 'The display is sharp, colorful and well-suited to both work and play.', battery: 'Better than many gaming laptops in this class.', buildQuality: 'Feels refined and premium with a more understated design.', whoShouldBuy: 'Users who want mobility without giving up high-end performance.', verdict: 'A polished option for people who want strong hardware and cleaner aesthetics.', affiliate: '#' },
  { id: 'apple-macbook-air-m3', name: 'Apple MacBook Air M3', image: 'images/best-business-laptop.png', price: '₹1,34,990', brand: 'Apple', category: 'Laptops', rating: 4.9, description: 'An energy-efficient premium laptop with strong battery life and a refined everyday experience.', pros: ['Excellent battery life', 'Quiet and portable', 'Excellent build'], cons: ['Less gaming-focused'], specifications: { processor: 'Apple M3', graphics: 'Integrated Apple GPU', memory: '16GB RAM', storage: '512GB SSD' }, performance: 'Outstanding for everyday tasks, multitasking and creative tasks.', display: 'The display is calm and bright with excellent color.', battery: 'Excellent daily battery performance.', buildQuality: 'Feels beautifully built and incredibly polished.', whoShouldBuy: 'Students, professionals and creators who want a premium notebook that feels effortless.', verdict: 'One of the most balanced premium laptops for a modern portable setup.', affiliate: '#' },
  { id: 'logitech-g915-tkl', name: 'Logitech G915 TKL', image: 'images/best-mechanical-keyboard.png', price: '₹19,999', brand: 'Logitech', category: 'Keyboards', rating: 4.7, description: 'A sleek low-profile keyboard with strong wireless performance and a refined typing feel.', pros: ['Low-profile', 'Excellent build', 'Strong wireless support'], cons: ['Not ideal for enthusiasts'], specifications: { layout: 'Tenkeyless', switches: 'Low-profile GL switches', connection: 'Lightspeed + Bluetooth', compatibility: 'Windows and macOS' }, performance: 'Fast and comfortable for both gaming and long work sessions.', display: 'No display, but the design remains premium and understated.', battery: 'Great for wireless use with very low friction.', buildQuality: 'Feels premium and solid, with clear attention to finish.', whoShouldBuy: 'Users who want a compact premium keyboard that looks elegant and works beautifully.', verdict: 'A strong choice for anyone who wants a polished mechanical-adjacent experience.', affiliate: '#' },
  { id: 'keychron-k8-pro', name: 'Keychron K8 Pro', image: 'images/best-mechanical-keyboard.png', price: '₹14,999', brand: 'Keychron', category: 'Keyboards', rating: 4.8, description: 'A compact and versatile keyboard with hot-swappable switches and a premium everyday feel.', pros: ['Hot-swappable switches', 'Multi-device support', 'Great value'], cons: ['Larger than ultra-compact boards'], specifications: { layout: 'TKL', switches: 'Hot-swappable', connection: 'Bluetooth + wired', compatibility: 'Windows and macOS' }, performance: 'Comfortable and responsive, with a satisfying tactile experience.', display: 'No display, but the physical design is clean and premium.', battery: 'Reliable wireless performance for day-to-day use.', buildQuality: 'Feels excellent for the price, with a premium metal body.', whoShouldBuy: 'People who want a premium keyboard without paying flagship prices.', verdict: 'A strong daily driver for work and play.', affiliate: '#' },
  { id: 'corsair-k70-pro', name: 'Corsair K70 PRO', image: 'images/best-mechanical-keyboard.png', price: '₹19,999', brand: 'Corsair', category: 'Keyboards', rating: 4.7, description: 'A premium gaming keyboard with excellent switches and a strong tournament-ready feel.', pros: ['Excellent switches', 'Premium feel', 'Great backlight'], cons: ['Can feel a bit heavy'], specifications: { layout: 'Full-size', switches: 'Optical', connection: 'Wired', compatibility: 'Windows' }, performance: 'Very fast and precise, with strong tactile feedback.', display: 'No display; performance is the highlight.', battery: 'Not applicable, wired-only design.', buildQuality: 'Feels incredibly solid and durable.', whoShouldBuy: 'Competitive gamers and enthusiasts who want premium hardware.', verdict: 'A polished gaming keyboard with unmistakable quality.', affiliate: '#' },
  { id: 'razer-blackwidow-v4', name: 'Razer BlackWidow V4', image: 'images/best-mechanical-keyboard.png', price: '₹18,999', brand: 'Razer', category: 'Keyboards', rating: 4.6, description: 'A refined mechanical keyboard with a strong gaming identity and satisfying press feel.', pros: ['Excellent typing feel', 'Great RGB lighting', 'Good build'], cons: ['Can be loud'], specifications: { layout: 'Full-size', switches: 'Green or yellow', connection: 'Wired', compatibility: 'Windows and macOS' }, performance: 'Reliable and satisfying for games, work and long sessions.', display: 'No display; the focus is on tactile quality.', battery: 'Not applicable, wired-only.', buildQuality: 'Feels sturdy and premium with a polished gaming style.', whoShouldBuy: 'Gamers who want a powerful keyboard that still feels premium.', verdict: 'A strong option for people who want style and performance together.', affiliate: '#' },
  { id: 'steelseries-apex-pro-tkl', name: 'SteelSeries Apex Pro TKL', image: 'images/best-mechanical-keyboard.png', price: '₹24,999', brand: 'SteelSeries', category: 'Keyboards', rating: 4.8, description: 'An enthusiast-friendly keyboard with adjustable switches and an exceptional premium feel.', pros: ['Adjustable switches', 'Compact form', 'Excellent build'], cons: ['Expensive'], specifications: { layout: 'TKL', switches: 'Adjustable', connection: 'Wired', compatibility: 'Windows and macOS' }, performance: 'Fast, precise and flexible for different playstyles.', display: 'No display; the experience is all about the keyboard itself.', battery: 'Not applicable, wired-only.', buildQuality: 'Feels very premium and carefully engineered.', whoShouldBuy: 'Enthusiasts and serious gamers who want a truly refined board.', verdict: 'An excellent keyboard for users who care deeply about performance and feel.', affiliate: '#' },
  { id: 'logitech-g-pro-x-superlight-2', name: 'Logitech G Pro X Superlight 2', image: 'images/best-gaming-mouse.png', price: '₹14,999', brand: 'Logitech', category: 'Mice', rating: 4.7, description: 'An ultra-lightweight gaming mouse designed for fast, precise movement and comfort.', pros: ['Incredibly light', 'Very accurate', 'Great for long sessions'], cons: ['Premium price', 'Minimal extra features'], specifications: { sensor: 'High-performance optical sensor', weight: 'Approx. 60g', connection: 'Wireless', battery: 'Excellent endurance' }, performance: 'Fast and responsive, with a minimal feel that keeps your hand moving freely.', display: 'No display; the focus is on comfort, tracking and responsiveness.', battery: 'Excellent battery performance for daily gaming and productivity use.', buildQuality: 'Feels refined and well-finished, with clear attention to balance and material quality.', whoShouldBuy: 'Competitive gamers and anyone who wants a lightweight mouse that can travel easily.', verdict: 'A strong premium mouse choice for players who want speed and comfort without extra bulk.', affiliate: '#' },
  { id: 'razer-deathadder-v3', name: 'Razer DeathAdder V3', image: 'images/best-gaming-mouse.png', price: '₹9,999', brand: 'Razer', category: 'Mice', rating: 4.6, description: 'A comfortable and responsive gaming mouse with a classic ergonomic shape and strong value.', pros: ['Comfortable', 'Great value', 'Reliable sensor'], cons: ['Less premium than flagship mice'], specifications: { sensor: 'Optical sensor', weight: 'Approx. 59g', connection: 'Wired', battery: 'Not applicable' }, performance: 'Feels solid and consistent for everyday games and work.', display: 'No display; ergonomics matter most.', battery: 'Not applicable, wired design.', buildQuality: 'Feels ergonomic and durable, with a practical everyday feel.', whoShouldBuy: 'Gamers who want strong value and comfort without overthinking the design.', verdict: 'A very easy recommendation for users who want more practical performance.', affiliate: '#' },
  { id: 'glorious-model-o2', name: 'Glorious Model O2', image: 'images/best-gaming-mouse.png', price: '₹8,999', brand: 'Glorious', category: 'Mice', rating: 4.6, description: 'A lightweight mouse with strong tracking and a clean minimalist design for fast-paced gameplay.', pros: ['Very light', 'Great sensor', 'Compact design'], cons: ['Can feel a bit fragile'], specifications: { sensor: 'High-performance optical sensor', weight: 'Approx. 65g', connection: 'Wired', battery: 'Not applicable' }, performance: 'Excellent for fast movement and precise reaction timing.', display: 'No display, but the feel is focused and intentional.', battery: 'Not applicable, wired design.', buildQuality: 'Feels lightweight and modern without sacrificing quality.', whoShouldBuy: 'Users who want a lighter mouse for fast movement and competitive play.', verdict: 'A compelling choice for competitive players who like a lighter, cleaner feel.', affiliate: '#' },
  { id: 'steelseries-rival-5', name: 'SteelSeries Rival 5', image: 'images/best-gaming-mouse.png', price: '₹7,999', brand: 'SteelSeries', category: 'Mice', rating: 4.5, description: 'A great all-rounder mouse with a comfortable grip and dependable sensors for daily use.', pros: ['Comfortable shape', 'Strong value', 'Good tracking'], cons: ['Less premium finish'], specifications: { sensor: 'Optical sensor', weight: 'Approx. 77g', connection: 'Wired', battery: 'Not applicable' }, performance: 'Reliable for gaming and productivity without a complicated setup.', display: 'No display; comfort and control are the priorities.', battery: 'Not applicable.', buildQuality: 'Feels practical and durable, with a straightforward design.', whoShouldBuy: 'Players who want a dependable mouse for work and play.', verdict: 'A very sensible everyday mouse that stays easy to recommend.', affiliate: '#' },
  { id: 'hyperx-pulsefire-haste-2', name: 'HyperX Pulsefire Haste 2', image: 'images/best-gaming-mouse.png', price: '₹6,999', brand: 'HyperX', category: 'Mice', rating: 4.5, description: 'A lightweight mouse with strong comfort and value for gamers who want a minimalist setup.', pros: ['Excellent portability', 'Reliable performance', 'Great price'], cons: ['Less premium packaging'], specifications: { sensor: 'Optical sensor', weight: 'Approx. 60g', connection: 'Wireless', battery: 'Good endurance' }, performance: 'Responsive and smooth for everyday competitive play.', display: 'No display; the form is the real appeal.', battery: 'Good enough for daily use without much fuss.', buildQuality: 'Feels solid and travel-friendly while staying approachable.', whoShouldBuy: 'Casual and competitive gamers who want a light and practical mouse.', verdict: 'A dependable choice for people who want to spend less without feeling underpowered.', affiliate: '#' },
  { id: 'dell-ultrasharp-u2723qe', name: 'Dell UltraSharp U2723QE', image: 'images/best-gaming-monitor.png', price: '₹44,999', brand: 'Dell', category: 'Monitors', rating: 4.8, description: 'A sharp 27-inch monitor that balances clarity, color accuracy and thoughtful connectivity.', pros: ['Excellent image clarity', 'Clean design', 'Strong connectivity'], cons: ['Not ideal for ultra-fast competitive gaming', 'Premium pricing'], specifications: { size: '27-inch', resolution: '4K', ports: 'USB-C, HDMI, DisplayPort', panel: 'IPS' }, performance: 'Consistently sharp and comfortable for work, editing and daily multimedia use.', display: 'The display is calm and vivid, with excellent color fidelity for both work and entertainment.', battery: 'Not applicable; the focus is on display quality and connectivity.', buildQuality: 'Feels solid and professional, with an understated premium finish.', whoShouldBuy: 'Professionals, students and creators who want a calmer and more productive workstation.', verdict: 'A refined monitor that excels in real-world productivity rather than just flashy specs.', affiliate: '#' },
  { id: 'lg-27gp850-b', name: 'LG 27GP850-B', image: 'images/best-gaming-monitor.png', price: '₹39,999', brand: 'LG', category: 'Monitors', rating: 4.7, description: 'A fast and vibrant monitor with strong color accuracy and excellent motion clarity for gaming.', pros: ['Great refresh performance', 'Excellent image quality', 'Strong gaming value'], cons: ['Can be a bit bright for some setups'], specifications: { size: '27-inch', resolution: '1440p', ports: 'HDMI, DisplayPort', panel: 'IPS' }, performance: 'Bright, quick and responsive for modern gaming.', display: 'A vivid display that keeps motion smooth and colors lively.', battery: 'Not applicable.', buildQuality: 'Feels premium without being overbuilt.', whoShouldBuy: 'Gaming-focused users who want a more serious display without moving into flagship pricing.', verdict: 'A very strong display option for people who care about both image quality and speed.', affiliate: '#' },
  { id: 'asus-rog-swift-pg279qm', name: 'ASUS ROG Swift PG279QM', image: 'images/best-gaming-monitor.png', price: '₹54,999', brand: 'ASUS', category: 'Monitors', rating: 4.8, description: 'A premium monitor with excellent speed and color performance for serious gaming and creative work.', pros: ['Excellent color', 'Fast response', 'Very polished finish'], cons: ['Premium price'], specifications: { size: '27-inch', resolution: '1440p', ports: 'DisplayPort, HDMI', panel: 'IPS' }, performance: 'Consistently smooth and responsive for demanding users.', display: 'Very crisp and sharp, with color that feels true to the source.', battery: 'Not applicable.', buildQuality: 'Feels premium and thoughtfully engineered.', whoShouldBuy: 'Competitive gamers and creators who want a premium display.', verdict: 'A flagship-feeling monitor that still feels practical day to day.', affiliate: '#' },
  { id: 'samsung-odyssey-g7', name: 'Samsung Odyssey G7', image: 'images/best-gaming-monitor.png', price: '₹36,999', brand: 'Samsung', category: 'Monitors', rating: 4.6, description: 'An immersive curved monitor with strong performance and a bold modern presence on your desk.', pros: ['Excellent immersion', 'Good contrast', 'Strong gaming feel'], cons: ['Curved design may not suit everyone'], specifications: { size: '27-inch', resolution: '1440p', ports: 'HDMI, DisplayPort', panel: 'VA' }, performance: 'Great for gaming and media with a more cinematic feel.', display: 'Vivid and immersive with a sharp sense of depth.', battery: 'Not applicable.', buildQuality: 'Feels modern and premium with a strong visual presence.', whoShouldBuy: 'Gamers and entertainment-focused users who want a more immersive display.', verdict: 'A strong design-forward display that feels premium in use.', affiliate: '#' },
  { id: 'gigabyte-m27q-x', name: 'Gigabyte M27Q X', image: 'images/best-gaming-monitor.png', price: '₹32,999', brand: 'Gigabyte', category: 'Monitors', rating: 4.6, description: 'A feature-rich gaming monitor that balances image quality, speed and value well.', pros: ['Great value', 'Fast response', 'Strong visuals'], cons: ['Stand could be more premium'], specifications: { size: '27-inch', resolution: '1440p', ports: 'HDMI, DisplayPort', panel: 'IPS' }, performance: 'Very solid for gaming without feeling overcomplicated.', display: 'Sharp clarity and color that feels lively and well-balanced.', battery: 'Not applicable.', buildQuality: 'Feels practical and dependable, with solid everyday quality.', whoShouldBuy: 'Gamers who want strong performance without jumping to the most expensive options.', verdict: 'A balanced premium monitor that still feels value-driven.', affiliate: '#' },
  { id: 'msi-modern-15', name: 'MSI Modern 15', image: 'images/best-business-laptop.png', price: '₹69,999', brand: 'MSI', category: 'Laptops', rating: 4.4, description: 'A slim everyday laptop with a balanced design for productivity and portability.', pros: ['Portable', 'Clean look', 'Solid performance'], cons: ['Not gaming-first'], specifications: { processor: 'Intel Core i5', graphics: 'Integrated', memory: '16GB RAM', storage: '512GB SSD' }, performance: 'A strong everyday performer for office work and streaming.', display: 'Clean and bright enough for day-to-day productivity.', battery: 'Reliable for commuting and travel.', buildQuality: 'Feels understated and durable.', whoShouldBuy: 'Students and professionals who want a calm premium laptop for daily use.', verdict: 'A sensible and attractive option for people who want a more minimal design.', affiliate: '#' },
  { id: 'steelseries-arctis-nova-7', name: 'SteelSeries Arctis Nova 7', image: 'images/best-gaming-headphones.png', price: '₹16,999', brand: 'SteelSeries', category: 'Headphones', rating: 4.6, description: 'A comfortable headset with dependable audio and good microphone clarity for gaming and calls.', pros: ['Comfortable fit', 'Versatile use', 'Clear mic'], cons: ['Slightly bulky', 'Not the most compact option'], specifications: { sound: 'Hi-res capable audio', mic: 'Clear detachable mic', connection: 'Wireless + wired', compatibility: 'PC, console and mobile' }, performance: 'Delivers balanced sound that works well for games, media and calls without feeling harsh.', display: 'No display, but the comfort and audio tuning make the experience feel premium.', battery: 'Reliable wireless performance that easily covers long sessions.', buildQuality: 'The headset feels durable and comfortable, with enough polish to feel like a serious daily accessory.', whoShouldBuy: 'Gamers and remote workers who want one headset that handles multiple situations well.', verdict: 'An easy recommendation for users who want quality audio with minimal fuss.', affiliate: '#' },
  { id: 'sony-wh-1000xm5', name: 'Sony WH-1000XM5', image: 'images/best-gaming-headphones.png', price: '₹29,999', brand: 'Sony', category: 'Headphones', rating: 4.8, description: 'Noise-cancelling headphones with premium comfort and excellent everyday audio quality.', pros: ['Excellent ANC', 'Comfortable', 'Great sound'], cons: ['Expensive'], specifications: { sound: 'Noise-cancelling audio', mic: 'Integrated mic', connection: 'Wireless + wired', compatibility: 'Mobile, laptop and console' }, performance: 'Excellent for calls, commuting and long listening sessions.', display: 'No display; the comfort and noise control are the appeal.', battery: 'Strong battery life for travel and long use.', buildQuality: 'Feels premium and thoughtfully made.', whoShouldBuy: 'Travelers and anyone who wants the best everyday noise-cancelling experience.', verdict: 'One of the strongest premium audio choices for a calm and polished setup.', affiliate: '#' },
  { id: 'bose-quietcomfort-45', name: 'Bose QuietComfort 45', image: 'images/best-gaming-headphones.png', price: '₹27,999', brand: 'Bose', category: 'Headphones', rating: 4.7, description: 'Comfort-first headphones with excellent noise isolation and a calm, balanced sound profile.', pros: ['Excellent comfort', 'Great ANC', 'Easy to wear all day'], cons: ['Not the most exciting design'], specifications: { sound: 'Balanced sound', mic: 'Integrated mic', connection: 'Wireless', compatibility: 'Mobile and laptop' }, performance: 'Fantastic for travel and long work sessions.', display: 'No display; comfort and calm sound are the key strengths.', battery: 'Dependable all-day battery performance.', buildQuality: 'Feels soft, sturdy and premium.', whoShouldBuy: 'People who want comfort-first headphones for travel and work.', verdict: 'A polished everyday choice if you value comfort and calm audio.', affiliate: '#' },
  { id: 'logitech-g733', name: 'Logitech G733', image: 'images/best-gaming-headphones.png', price: '₹12,999', brand: 'Logitech', category: 'Headphones', rating: 4.5, description: 'A colorful headset with wireless convenience and a comfortable design for gaming and casual use.', pros: ['Comfortable', 'Good wireless flexibility', 'Bright style'], cons: ['Sound is not the most detailed'], specifications: { sound: 'Immersive gaming audio', mic: 'Detachable mic', connection: 'Wireless', compatibility: 'PC and console' }, performance: 'Great for gaming and chat with a fun, lively sound.', display: 'No display; comfort and style are the focus.', battery: 'Good on-device endurance for daily use.', buildQuality: 'Feels light, durable and easy to use.', whoShouldBuy: 'Gamers who want a stylish headset without excessive complexity.', verdict: 'A practical and approachable choice for everyday play.', affiliate: '#' },
  { id: 'hyperx-cloud-3', name: 'HyperX Cloud III', image: 'images/best-gaming-headphones.png', price: '₹9,999', brand: 'HyperX', category: 'Headphones', rating: 4.5, description: 'A comfortable and easy-to-recommend headset with a strong budget-to-premium balance.', pros: ['Very comfortable', 'Great value', 'Clear mic'], cons: ['Not the most premium finish'], specifications: { sound: 'Balanced gaming audio', mic: 'Clear mic', connection: 'Wired', compatibility: 'PC and console' }, performance: 'Solid and dependable for everyday gaming and calls.', display: 'No display; comfort is the main selling point.', battery: 'Not applicable, wired design.', buildQuality: 'Feels sturdy and practical.', whoShouldBuy: 'Casual gamers and everyday users who want comfortable audio.', verdict: 'A practical and approachable headset for a wide range of users.', affiliate: '#' },
  { id: 'razer-blackshark-v2', name: 'Razer BlackShark V2', image: 'images/best-gaming-headphones.png', price: '₹10,999', brand: 'Razer', category: 'Headphones', rating: 4.6, description: 'A well-balanced headset that brings strong mic and audio quality to a more accessible price point.', pros: ['Excellent mic', 'Comfortable', 'Good value'], cons: ['Not the most flashy design'], specifications: { sound: 'Immersive sound', mic: 'High-quality mic', connection: 'Wired', compatibility: 'PC and console' }, performance: 'Great for gaming and voice chat without feeling overbuilt.', display: 'No display; the audio and mic quality are the focus.', battery: 'Not applicable, wired design.', buildQuality: 'Feels durable and well-made for the price.', whoShouldBuy: 'Competitive gamers who care about communication and comfort.', verdict: 'A practical pick for players who want dependable sound and voice quality.', affiliate: '#' },
  { id: 'samsung-980-pro-1tb', name: 'Samsung 980 PRO 1TB', image: 'images/best-gaming-laptop.png', price: '₹14,999', brand: 'Samsung', category: 'SSDs', rating: 4.8, description: 'A high-speed NVMe SSD built for quick loading times and fast system responsiveness.', pros: ['Excellent speed', 'Reliable', 'Great for gaming'], cons: ['Pricey for smaller capacities'], specifications: { capacity: '1TB', interface: 'PCIe 4.0 NVMe', endurance: 'High endurance', compatibility: 'PC and console' }, performance: 'Fast enough to make system boot times and file loads feel immediate.', display: 'No display; performance is all about storage speed.', battery: 'Not applicable.', buildQuality: 'Feels compact and professionally finished.', whoShouldBuy: 'Gamers and creators who want fast storage for major projects and games.', verdict: 'A strong premium SSD for anyone who wants immediate responsiveness.', affiliate: '#' },
  { id: 'wd-black-sn850x', name: 'WD Black SN850X', image: 'images/best-gaming-laptop.png', price: '₹13,999', brand: 'WD', category: 'SSDs', rating: 4.7, description: 'A high-performance SSD with strong sustained speeds and excellent reliability.', pros: ['Fast speeds', 'Great endurance', 'Solid value'], cons: ['Can be expensive'], specifications: { capacity: '1TB', interface: 'PCIe 4.0 NVMe', endurance: 'Reliable long-term use', compatibility: 'PC and console' }, performance: 'Excellent for game installs, media editing and large project transfers.', display: 'No display; the focus is on speed.', battery: 'Not applicable.', buildQuality: 'Feels compact and dependable.', whoShouldBuy: 'Power users and gamers who want fast storage that stays reliable.', verdict: 'A flexible and dependable SSD that fits a premium modern build.', affiliate: '#' },
  { id: 'crucial-t500', name: 'Crucial T500', image: 'images/best-gaming-laptop.png', price: '₹11,999', brand: 'Crucial', category: 'SSDs', rating: 4.6, description: 'A strong storage upgrade with convincing performance and a good value profile.', pros: ['Good value', 'Competitive speeds', 'Easy to recommend'], cons: ['Not the absolute fastest'], specifications: { capacity: '1TB', interface: 'PCIe 4.0 NVMe', endurance: 'Solid long-term performance', compatibility: 'PC and console' }, performance: 'Great for boot times, app loads and general responsiveness.', display: 'No display; the appeal is pure performance.', battery: 'Not applicable.', buildQuality: 'Feels well-engineered and practical.', whoShouldBuy: 'Users who want a fast and reliable SSD without paying flagship prices.', verdict: 'An easy, well-rounded recommendation for a modern setup.', affiliate: '#' },
  { id: 'kingston-fury-renegade', name: 'Kingston Fury Renegade', image: 'images/best-gaming-laptop.png', price: '₹12,999', brand: 'Kingston', category: 'SSDs', rating: 4.6, description: 'A fast SSD with a strong reputation for stability and a premium-looking heatsink design.', pros: ['Excellent thermals', 'Fast transfers', 'Great for gaming'], cons: ['Can cost more than basic alternatives'], specifications: { capacity: '1TB', interface: 'PCIe 4.0 NVMe', endurance: 'High endurance', compatibility: 'PC and console' }, performance: 'Handles demanding workloads and fast game installs with ease.', display: 'No display; performance is the main story.', battery: 'Not applicable.', buildQuality: 'Feels premium and thoughtfully designed.', whoShouldBuy: 'Enthusiasts and gamers who want impressive speed and dependable quality.', verdict: 'A smart SSD pick for people building or upgrading a more serious system.', affiliate: '#' },
  { id: 'seagate-firecuda-530', name: 'Seagate FireCuda 530', image: 'images/best-gaming-laptop.png', price: '₹15,999', brand: 'Seagate', category: 'SSDs', rating: 4.7, description: 'A high-end SSD crafted for serious performance, especially when you need strong sustained transfers.', pros: ['Excellent transfer speeds', 'Very strong endurance', 'Premium performance'], cons: ['More expensive than mainstream options'], specifications: { capacity: '1TB', interface: 'PCIe 4.0 NVMe', endurance: 'Very high endurance', compatibility: 'PC and console' }, performance: 'Excellent for gaming, editing and large file operations without bottlenecks.', display: 'No display; speed and endurance are the priority.', battery: 'Not applicable.', buildQuality: 'Feels durable and thoughtfully engineered.', whoShouldBuy: 'Creators and enthusiasts who need fast storage for larger workloads.', verdict: 'A premium SSD for users with big performance ambitions.', affiliate: '#' },
  { id: 'anker-737-charger', name: 'Anker 737 Charger', image: 'images/best-student-laptop.png', price: '₹9,999', brand: 'Anker', category: 'Accessories', rating: 4.7, description: 'A smart travel charger that keeps laptops, phones and tablets powered from one streamlined setup.', pros: ['Fast charging', 'Great for travel', 'Multi-device support'], cons: ['Can feel overbuilt for simple setups', 'Higher price'], specifications: { output: 'High-power delivery', compatibility: 'Phones, tablets and laptops', design: 'Compact travel-friendly form' }, performance: 'A dependable everyday companion that makes a busy desk feel cleaner and easier to manage.', display: 'No display; it is about power and practical utility.', battery: 'Not applicable; this accessory powers your gear instead of storing energy.', buildQuality: 'Feels thoughtful and well-finished, with the sort of quality that makes daily use feel easier.', whoShouldBuy: 'Travelers, students and remote workers who want one charger that handles multiple devices elegantly.', verdict: 'A practical premium accessory that quietly improves your whole setup.', affiliate: '#' },
  { id: 'belkin-3-in-1-hub', name: 'Belkin 3-in-1 Hub', image: 'images/best-student-laptop.png', price: '₹6,999', brand: 'Belkin', category: 'Accessories', rating: 4.5, description: 'A compact hub that expands your ports and makes a clean workstation feel more flexible.', pros: ['Portable', 'Great for travel', 'Useful port mix'], cons: ['Limited premium features'], specifications: { output: 'USB-C connectivity', compatibility: 'Laptops and tablets', design: 'Compact travel-friendly form' }, performance: 'Keeps your desk setup simpler and more useful without adding much clutter.', display: 'No display; it is all about connectivity.', battery: 'Not applicable.', buildQuality: 'Feels compact and reliable with a simple premium finish.', whoShouldBuy: 'Remote workers and students who want to simplify their tech setup.', verdict: 'A practical and stylish accessory for people who want more flexibility from less hardware.', affiliate: '#' },
  { id: 'logitech-brio-500', name: 'Logitech Brio 500', image: 'images/best-student-laptop.png', price: '₹11,999', brand: 'Logitech', category: 'Accessories', rating: 4.6, description: 'A high-quality webcam designed to make calls, streaming and meetings feel sharper and more polished.', pros: ['Excellent video quality', 'Good lighting', 'Compact design'], cons: ['Can feel a bit premium for basic use'], specifications: { output: '1080p webcam', compatibility: 'PC and laptop', design: 'Compact and polished' }, performance: 'Great for calls, streaming and content creation.', display: 'No display; it is all about the camera experience.', battery: 'Not applicable.', buildQuality: 'Feels neat and thoughtfully built.', whoShouldBuy: 'Creators, remote workers and streamers who want better video quality.', verdict: 'A polished accessory that makes virtual communication feel much more professional.', affiliate: '#' }
];

const productCategories = ['All', 'Laptops', 'Keyboards', 'Mice', 'Monitors', 'Headphones', 'SSDs', 'Accessories'];

function setPageSchema(schema) {
  const scriptTag = document.getElementById('page-schema');
  if (scriptTag) {
    scriptTag.textContent = JSON.stringify(schema);
  }
}

function renderProductsPage() {
  const searchInput = document.getElementById('product-search');
  const filterBar = document.getElementById('products-filters');
  const grid = document.getElementById('products-grid');

  if (!searchInput || !filterBar || !grid) {
    return;
  }

  let activeCategory = 'All';
  let query = '';

  const renderFilters = () => {
    filterBar.innerHTML = productCategories.map((category) => {
      const active = category === activeCategory ? 'is-active' : '';
      return `<button type="button" class="product-filter ${active}" data-category="${category}">${category}</button>`;
    }).join('');
  };

  const renderProducts = () => {
    const filtered = productCatalog.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const haystack = `${product.name} ${product.brand} ${product.description} ${product.category}`.toLowerCase();
      const matchesQuery = !query || haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });

    if (!filtered.length) {
      grid.innerHTML = '<div class="product-empty">No products match that search yet. Try a different term.</div>';
      window.initRevealEffects?.();
      return;
    }

    grid.innerHTML = filtered.map((product, index) => `
      <article class="product-card glass-card reveal active" style="animation-delay:${index * 80}ms">
        <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
        <div class="product-card__body">
          <div class="product-card__meta">
            <span class="product-card__brand">${product.brand}</span>
            <span class="product-card__rating">★ ${product.rating.toFixed(1)}</span>
          </div>
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${product.price}</span>
            <a class="btn btn-primary" href="product.html?id=${product.id}">Check Price</a>
          </div>
        </div>
      </article>
    `).join('');
    window.initRevealEffects?.();
  };

  searchInput.addEventListener('input', (event) => {
    query = event.target.value.trim();
    renderProducts();
  });

  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-category]');
    if (!button) {
      return;
    }
    activeCategory = button.getAttribute('data-category');
    renderFilters();
    renderProducts();
  });

  setPageSchema({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://aroundlaze-stack.github.io/my-website/products.html#webpage',
    url: 'https://aroundlaze-stack.github.io/my-website/products.html',
    name: 'Premium Tech Products & Buying Guides | Smart Picks Daily',
    description: 'Browse premium laptops, keyboards, mice, monitors, audio gear, and accessories with curated buying guidance.',
    isPartOf: { '@id': 'https://aroundlaze-stack.github.io/my-website/#website' },
    breadcrumb: { '@id': 'https://aroundlaze-stack.github.io/my-website/products.html#breadcrumb' }
  });

  renderFilters();
  renderProducts();
}

function renderProductDetails() {
  const detailRoot = document.getElementById('product-detail');
  if (!detailRoot) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const product = productCatalog.find((item) => item.id === productId);

  if (!product) {
    detailRoot.innerHTML = '<div class="product-empty">That product could not be found. Return to the catalog and choose a featured item.</div>';
    setPageSchema({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://aroundlaze-stack.github.io/my-website/product.html#webpage',
      url: 'https://aroundlaze-stack.github.io/my-website/product.html',
      name: 'Product Details | Smart Picks Daily',
      description: 'Explore detailed product specs, performance notes, and buying guidance for premium tech picks.'
    });
    return;
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://aroundlaze-stack.github.io/my-website/product.html#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aroundlaze-stack.github.io/my-website/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://aroundlaze-stack.github.io/my-website/products.html' },
      { '@type': 'ListItem', position: 3, name: product.name, item: `https://aroundlaze-stack.github.io/my-website/product.html?id=${product.id}` }
    ]
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://aroundlaze-stack.github.io/my-website/product.html?id=${product.id}#product`,
    name: product.name,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    description: product.description,
    image: [`https://aroundlaze-stack.github.io/my-website/${product.image}`],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price.replace(/[₹,]/g, ''),
      availability: 'https://schema.org/InStock',
      url: product.affiliate
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: 1
    }
  };

  setPageSchema({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://aroundlaze-stack.github.io/my-website/product.html?id=${product.id}#webpage`,
    url: `https://aroundlaze-stack.github.io/my-website/product.html?id=${product.id}`,
    name: `${product.name} | Smart Picks Daily`,
    description: product.description,
    breadcrumb: breadcrumbSchema,
    mainEntity: productSchema
  });

  detailRoot.innerHTML = `
    <section class="product-detail-shell reveal active">
      <div class="product-detail-shell__media">
        <img src="${product.image}" alt="${product.name}" loading="eager" decoding="async">
      </div>
      <div class="product-detail-shell__content">
        <p class="eyebrow">${product.category}</p>
        <h1>${product.name}</h1>
        <p class="product-detail-shell__brand">${product.brand}</p>
        <div class="product-detail-shell__meta">
          <span>★ ${product.rating.toFixed(1)}</span>
          <span>${product.price}</span>
        </div>
        <p>${product.description}</p>

        <div class="product-detail-shell__section">
          <h2>Specifications</h2>
          <ul>
            ${Object.entries(product.specifications).map(([key, value]) => `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`).join('')}
          </ul>
        </div>

        <div class="product-detail-shell__section">
          <h2>Features</h2>
          <ul>
            ${product.pros.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="product-detail-shell__section product-detail-shell__split">
          <div>
            <h2>Pros</h2>
            <ul>${product.pros.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div>
            <h2>Cons</h2>
            <ul>${product.cons.map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>

        <div class="product-detail-shell__section">
          <h2>Who should buy it</h2>
          <p>${product.whoShouldBuy}</p>
        </div>

        <div class="product-detail-shell__section">
          <h2>Performance</h2>
          <p>${product.performance}</p>
          <h2>Display</h2>
          <p>${product.display}</p>
          <h2>Battery</h2>
          <p>${product.battery}</p>
          <h2>Build Quality</h2>
          <p>${product.buildQuality}</p>
        </div>

        <div class="product-detail-shell__section">
          <h2>Verdict</h2>
          <p>${product.verdict}</p>
        </div>

        <a class="btn btn-primary product-detail-shell__buy" href="${product.affiliate}" target="_blank" rel="noopener">Buy Now</a>
      </div>
    </section>
  `;
  window.initRevealEffects?.();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderProductsPage();
    renderProductDetails();
  });
} else {
  renderProductsPage();
  renderProductDetails();
}
