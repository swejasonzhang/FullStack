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

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

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
    name: "VALORANT $100 Gift Card - PC [Online Game Code]",
    cost: 100.00,
    category: "Video Games",
    stock: 138,
    description: "The perfect gift for anyone who plays VALORANT or trying it out for the first time. Unlocks in-game currency that can be used to purchase weapon skins and unlock new agents. Gift cards are redeemable on Riot accounts in the US only."
  })

  ValorantGiftCard.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Valorant+Gift+Card.jpg"), filename: "ValorantGiftCard.png")

  CorsairVirtuoso = Item.create!({
    name: "CORSAIR VIRTUOSO RGB WIRELESS XT Multiplatform Gaming Headset With Bluetooth - Dolby Atmos",
    cost: 269.99,
    category: "Headset",
    stock: 53,
    description: "Simultaneous Dual-wireless Connections: Get high-fidelity 24bit/48KHz game audio with hyper-fast, ultra-long range SLIPSTREAM CORSAIR WIRELESS TECHNOLOGY, plus Bluetooth with Qualcomm aptX HD. Uncompromising Sound Quality: A matched pair of precisely tuned 50mm high-density neodymium speaker drivers deliver impeccable sound with a frequency range of 20Hz-40,000Hz – double that of typical gaming headsets. Comfort is King: Premium memory foam earpads that conform to the shape of your head, along with a lightweight headband deliver pillow-soft, long-lasting comfort, enabling you to play for hours on end. Broadcast-Grade Detachable Microphone: A 9.5mm omnidirectional, high-bandwidth microphone provides wide dynamic range and superb vocal clarity with excellent low-end response. Premium Lightweight Construction: Built with machined aluminum throughout, from the headband to the ear cups, ensuring both maximum comfort and long-term durability. Immersive Dolby Atmos on PC: Places the sounds of the game all around you with three-dimensional precision, so you can react faster and more accurately."
  })

  CorsairVirtuoso.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/Corsair+Virtuoso.jpeg"), filename: "Corsair Virtuoso.jpeg")

  CorsairMouse = Item.create!({
    name: "Corsair M75 AIR Wireless Ultra Lightweight Gaming Mouse – 2.4GHz & Bluetooth – 26,000 DPI – Up to 100hrs Battery – iCUE Compatible – Black",
    cost: 119.98,
    category: "Mouse",
    stock: 94,
    description: "0.13lb – Ultra Lightweight for Quick, Precise FPS Play: Not just light. Ultra-light. Free of unneeded frills to achieve the lightest weight possible at 0.13lbs, M75 AIR provides only what you need to win. Ultra-Precise 26k DPI Optical Sensor: With a native 26,000 DPI, 650 IPS tracking, and up to 50G acceleration, the CORSAIR MARKSMAN optical sensor accurately captures fast-twitch mouse movements, speedy sweeps, and rapid recenters. CORSAIR QUICKSTRIKE BUTTONS: CORSAIR QUICKSTRIKE delivers zero delay between the left and right click buttons and their switches, so your shots register instantly. Optical Left- and Right-Click Switches: Optical switches eliminate debounce, enabling you to attack with astonishing speed, guaranteed for 100 million clicks. Fast Low-Latency Wireless: SLIPSTREAM WIRELESS offers a no-lag, sub-1ms connection. Alternatively connect via Bluetooth or USB to charge while you play."
  })

  CorsairMouse.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/CorsairMouse.png"), filename: "CorsairMouse.png")

  CorsairKeyboard = Item.create!({
    name: "Corsair K65 RGB Mini 60% Mechanical Gaming Keyboard - Cherry MX Speed - Black",
    cost: 76.99,
    category: "Keyboard",
    stock: 73,
    description: "Small Size, Big Features: The K65 RGB MINI delivers big features compressed into a 60% form-factor to easily fit into even the tightest spaces for comfortable gaming. Powered by CORSAIR AXON Hyper-Processing Technology: Transmits your inputs to your PC up to 8x faster than conventional gaming keyboards with 8,000Hz hyper-polling. 100% CHERRY MX SPEED RGB Silver Mechanical Keyswitches: Lightning-fast response times with a 1.2mm actuation distance, registering up to 4x faster than standard mechanical keyboards with CORSAIR AXON. Personalize Your Play: Show off your style with dynamic per-key RGB backlighting as well as an optional included radiant spacebar and CORSAIR logo key, along with a standard bottom row layout. PBT Double-Shot Keycaps: A precision-molded keycap set that resists wear, fading, and shine, with 1.5mm thickness for rigid stability."
  })

  CorsairKeyboard.photo.attach(io: URI.open("https://amazeon-seeds.s3.amazonaws.com/CorsairKeyboard.jpeg"), filename: "CorsairKeyboard.png")

  puts "Done!"
# end

  