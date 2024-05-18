require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Item.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ActiveRecord::Base.connection.reset_pk_sequence!('reviews')
  ActiveRecord::Base.connection.reset_pk_sequence!('cart_items')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: "Demo", 
    email: "Demouser@gmail.com", 
    password: "Password"
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: Faker::Internet.unique.password
    }) 
  end

  ValorantGiftCard = Item.create!({
    id: 1,
    name: "VALORANT $100 Gift Card - PC [Online Game Code]",
    cost: 100.00,
    category: "Video Games",
    stock: 138,
    description: "The perfect gift for anyone who plays VALORANT or trying it out for the first time. Unlocks in-game currency that can be used to purchase weapon skins and unlock new agents. Gift cards are redeemable on Riot accounts in the US only."
  })

  ValorantGiftCard.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Valorant.jpg"), filename: "Valorant.jpg")

  CorsairVirtuoso = Item.create!({
    id: 2,
    name: "CORSAIR VIRTUOSO RGB WIRELESS XT Multiplatform Gaming Headset With Bluetooth - Dolby Atmos",
    cost: 269.99,
    category: "Headset",
    stock: 53,
    description: "Simultaneous Dual-wireless Connections: Get high-fidelity 24bit/48KHz game audio with hyper-fast, ultra-long range SLIPSTREAM CORSAIR WIRELESS TECHNOLOGY, plus Bluetooth with Qualcomm aptX HD. Uncompromising Sound Quality: A matched pair of precisely tuned 50mm high-density neodymium speaker drivers deliver impeccable sound with a frequency range of 20Hz-40,000Hz – double that of typical gaming headsets. Comfort is King: Premium memory foam earpads that conform to the shape of your head, along with a lightweight headband deliver pillow-soft, long-lasting comfort, enabling you to play for hours on end. Broadcast-Grade Detachable Microphone: A 9.5mm omnidirectional, high-bandwidth microphone provides wide dynamic range and superb vocal clarity with excellent low-end response. Premium Lightweight Construction: Built with machined aluminum throughout, from the headband to the ear cups, ensuring both maximum comfort and long-term durability. Immersive Dolby Atmos on PC: Places the sounds of the game all around you with three-dimensional precision, so you can react faster and more accurately."
  })

  CorsairVirtuoso.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Headset.jpg"), filename: "Headset.jpg")

  CorsairMouse = Item.create!({
    id: 3,
    name: "Corsair M75 AIR Wireless Ultra Lightweight Gaming Mouse – 2.4GHz & Bluetooth – 26,000 DPI – Up to 100hrs Battery – iCUE Compatible – Black",
    cost: 119.98,
    category: "Mouse",
    stock: 94,
    description: "0.13lb – Ultra Lightweight for Quick, Precise FPS Play: Not just light. Ultra-light. Free of unneeded frills to achieve the lightest weight possible at 0.13lbs, M75 AIR provides only what you need to win. Ultra-Precise 26k DPI Optical Sensor: With a native 26,000 DPI, 650 IPS tracking, and up to 50G acceleration, the CORSAIR MARKSMAN optical sensor accurately captures fast-twitch mouse movements, speedy sweeps, and rapid recenters. CORSAIR QUICKSTRIKE BUTTONS: CORSAIR QUICKSTRIKE delivers zero delay between the left and right click buttons and their switches, so your shots register instantly. Optical Left- and Right-Click Switches: Optical switches eliminate debounce, enabling you to attack with astonishing speed, guaranteed for 100 million clicks. Fast Low-Latency Wireless: SLIPSTREAM WIRELESS offers a no-lag, sub-1ms connection. Alternatively connect via Bluetooth or USB to charge while you play."
  })

  CorsairMouse.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Mouse.jpg"), filename: "Mouse.jpg")

  CorsairKeyboard = Item.create!({
    id: 4,
    name: "Corsair K65 RGB Mini 60% Mechanical Gaming Keyboard - Cherry MX Speed - Black",
    cost: 76.99,
    category: "Keyboard",
    stock: 73,
    description: "Small Size, Big Features: The K65 RGB MINI delivers big features compressed into a 60% form-factor to easily fit into even the tightest spaces for comfortable gaming. Powered by CORSAIR AXON Hyper-Processing Technology: Transmits your inputs to your PC up to 8x faster than conventional gaming keyboards with 8,000Hz hyper-polling. 100% CHERRY MX SPEED RGB Silver Mechanical Keyswitches: Lightning-fast response times with a 1.2mm actuation distance, registering up to 4x faster than standard mechanical keyboards with CORSAIR AXON. Personalize Your Play: Show off your style with dynamic per-key RGB backlighting as well as an optional included radiant spacebar and CORSAIR logo key, along with a standard bottom row layout. PBT Double-Shot Keycaps: A precision-molded keycap set that resists wear, fading, and shine, with 1.5mm thickness for rigid stability."
  })

  CorsairKeyboard.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Keyboard.jpg"), filename: "Keyboard.jpg")

  Moniter = Item.create!({
    id: 5,
    name: "HP 27-inch FHD IPS Gaming Monitor with Tilt/Height Adjustment with AMD FreeSync PremiumTechnology (X27, 2021 model)",
    cost: 275.00,
    category: "Monitor",
    stock: 192,
    description: "The Eyesafe Certified Display meets TÜV low blue light requirements and Eyesafe standards, protecting your eyes without distorting colors. It features adjustable height, pivot, and tilt for comfortable viewing. The packaging is sustainably sourced, using fewer materials and more recycled content. With AMD FreeSync Premium technology, enjoy a high refresh rate, low framerate compensation, and low latency for confident gaming. A 1-millisecond response time with Overdrive ensures fluid, crisp visuals without motion blur in fast-paced games."
  })

  Moniter.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Moniter.jpg"), filename: "Moniter.jpg")

  Mousepad = Item.create!({
    id: 6,
    name: "Corsair MM300 - Anti-Fray Cloth Gaming - High-Performance Mouse Pad Optimized for Gaming Sensors - Designed for Maximum Control - Extended, Multi Color",
    cost: 29.99,
    category: "Mousepad",
    stock: 391,
    description: "The textile weave surface offers superior control with pixel-precise targeting and low friction tracking. Surrounded stitched edges ensure durability by preventing surface peeling. Optimized for both laser and optical gaming mice, it provides accurate and precise movements. The anti-skid rubber base keeps it securely in place."
  })

  Mousepad.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Mousepad.jpg"), filename: "Mousepad.jpg")

  VirtualReality = Item.create!({
    id: 7,
    name: "Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB",
    cost: 249.99,
    category: "Virtual Reality",
    stock: 29,
    description: "Experience total immersion with 3D audio, hand tracking, and easy-to-use controllers. Explore over 500 titles across various genres, including exclusive VR experiences. Enjoy smooth gameplay and immersive graphics with a fast processor. Socialize in multiplayer arenas, attend live events, and join adventures. The wireless headset features intuitive controls, a built-in battery, and easy setup, with no PC or console needed. Set a play space and get alerts if you move outside it."
  })

  VirtualReality.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/VirtualReality.jpg"), filename: "VirtualReality.jpg")

  MoniterStand = Item.create!({
    id: 8,
    name: "RGB Gaming Computer Monitor Stand Riser with Drawer,Storage and Phone Holder - 1 USB 3.0 and 3 USB 2.0 Hub, 3 Length Adjustable",
    cost: 32.99,
    category: "Moniter Stand",
    stock: 89,
    description: "The computer stand features 1 USB 3.0 port, 3 USB 2.0 ports, and RGB lights with a memory function, offering 10 lighting effects. Its foldable, adjustable design supports up to 66 lbs and provides ergonomic height options to relieve neck and back fatigue. Suitable for monitors, printers, and laptops, it comes with a 3-year warranty for quality assurance."
  })

  MoniterStand.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/MoniterStand.jpg"), filename: "MoniterStand.jpg")

  Mic = Item.create!({
    id: 9,
    name: "FIFINE XLR/USB Dynamic Microphone for Podcast Recording, PC Computer Gaming Streaming Mic with RGB Light, Mute Button, Headphones Jack, Desktop Stand, Vocal Mic for Singing YouTube-AmpliGame AM8",
    cost: 64.99,
    category: "Mic",
    stock: 53,
    description: "The podcasting XLR microphone delivers natural audio clarity with a frequency response of 50Hz-16KHz, rejecting unwanted noise for clear vocal recordings. It offers both XLR and USB connections, with features like tap-to-mute, RGB lighting, and a headphone jack for real-time monitoring. Suitable for gaming, streaming, and recording, it includes a noise-canceling windscreen and fits most mic stands."
  })

  Mic.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Mic.jpg"), filename: "Mic.jpg")

  PowerStrip = Item.create!({
    id: 10,
    name: "Power Strip, SUPERDANNY Surge Protector with 22 AC Outlets and 6 USB Charging Ports, 1875W/15A, 2100 Joules, 6.5Ft Flat Plug Heavy Duty Extension Cord for Home, Office, Dorm, Gaming Room, Black",
    cost: 69.99,
    category: "Power Strip",
    stock: 189,
    description: "The SUPERDANNY 28-in-1 versatile power strip, certified by FCC, RoHS, and UL, features 22 grounded outlets and 6 USB ports, accommodating all your devices in one location. Its widely spaced outlets and smart USB fast charging, including USB-C, prevent clutter and ensure efficient power delivery. With a mountable flat plug, heavy-duty extension cord, and an extensive 1,000-day warranty, this power strip offers reliable, protected power for your setup."
  })

  PowerStrip.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/PowerStrip.jpg"), filename: "PowerStrip.jpg")

  puts "Done!"
# end

  