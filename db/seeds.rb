require "open-uri"

puts "Destroying tables..."
CartItem.destroy_all
Review.destroy_all
User.destroy_all
Item.destroy_all

puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!("users")
ActiveRecord::Base.connection.reset_pk_sequence!("reviews")
ActiveRecord::Base.connection.reset_pk_sequence!("cart_items")

puts "Creating users..."
User.create!(username: "Demo", email: "Demouser@gmail.com", password: "Password")

10.times do
  User.create!(
    username: Faker::Internet.unique.username(specifier: 3),
    email: Faker::Internet.unique.email,
    password: Faker::Internet.unique.password
  )
end

items = [
  { id: 1, name: "VALORANT $100 Gift Card - PC [Online Game Code]", cost: 100.00, category: "Video Games", stock: 138,
    description: "The perfect gift for anyone who plays VALORANT or trying it out for the first time. Unlocks in-game currency that can be used to purchase weapon skins and unlock new agents. Gift cards are redeemable on Riot accounts in the US only." },
  { id: 2, name: "CORSAIR VIRTUOSO RGB WIRELESS XT Multiplatform Gaming Headset With Bluetooth - Dolby Atmos", cost: 269.99, category: "Headset", stock: 53,
    description: "Simultaneous dual-wireless connections deliver high-fidelity 24bit/48KHz game audio with ultra-long range SLIPSTREAM wireless plus Bluetooth. A matched pair of tuned 50mm neodymium drivers cover 20Hz-40,000Hz, premium memory-foam earpads keep you comfortable for hours, and a broadcast-grade detachable microphone captures clear vocals. Machined aluminum construction and immersive Dolby Atmos on PC round it out." },
  { id: 3, name: "Corsair M75 AIR Wireless Ultra Lightweight Gaming Mouse - 26,000 DPI - iCUE Compatible - Black", cost: 119.98, category: "Mouse", stock: 94,
    description: "At just 0.13lb this ultra-light mouse is built for quick, precise FPS play. The 26,000 DPI MARKSMAN optical sensor tracks at 650 IPS, QUICKSTRIKE buttons remove click delay, and optical switches are rated for 100 million clicks. Connect via sub-1ms SLIPSTREAM wireless, Bluetooth, or USB." },
  { id: 4, name: "Corsair K65 RGB Mini 60% Mechanical Gaming Keyboard - Cherry MX Speed - Black", cost: 76.99, category: "Keyboard", stock: 73,
    description: "A 60% form factor packs big features into a tiny footprint. CORSAIR AXON hyper-processing transmits inputs up to 8x faster with 8,000Hz polling, 100% CHERRY MX Speed Silver switches actuate at 1.2mm, and per-key RGB plus PBT double-shot keycaps finish the look." },
  { id: 5, name: "HP 27-inch FHD IPS Gaming Monitor with AMD FreeSync Premium (X27, 2021 model)", cost: 275.00, category: "Monitor", stock: 192,
    description: "An Eyesafe-certified IPS display with adjustable height, pivot, and tilt for comfortable viewing. AMD FreeSync Premium technology provides a high refresh rate, low framerate compensation, and low latency, while a 1ms response time with Overdrive keeps fast-paced games crisp." },
  { id: 6, name: "Corsair MM300 Anti-Fray Cloth Gaming Mouse Pad - Extended", cost: 29.99, category: "Mousepad", stock: 391,
    description: "A textile-weave surface offers pixel-precise targeting with low-friction tracking, stitched edges prevent peeling for lasting durability, and the anti-skid rubber base keeps everything in place. Optimized for both laser and optical gaming mice." },
  { id: 7, name: "Meta Quest 2 - Advanced All-In-One Virtual Reality Headset - 128 GB", cost: 249.99, category: "Virtual Reality", stock: 29,
    description: "Total immersion with 3D audio, hand tracking, and intuitive controllers. Explore over 500 titles, enjoy smooth gameplay on a fast processor, and socialize in multiplayer arenas and live events. The wireless headset has a built-in battery and needs no PC or console." },
  { id: 8, name: "RGB Gaming Monitor Stand Riser with Drawer, Storage and Phone Holder - USB 3.0 and 2.0 Hub", cost: 32.99, category: "Monitor Stand", stock: 89,
    description: "One USB 3.0 port, three USB 2.0 ports, and RGB lighting with 10 effects and memory. The foldable, height-adjustable design supports up to 66 lbs and relieves neck and back fatigue. Works with monitors, printers, and laptops and includes a 3-year warranty." },
  { id: 9, name: "FIFINE XLR/USB Dynamic Microphone with RGB, Mute Button and Headphones Jack - AmpliGame AM8", cost: 64.99, category: "Mic", stock: 53,
    description: "A dynamic XLR/USB microphone with 50Hz-16KHz response that rejects unwanted noise for clear vocals. Tap-to-mute, RGB lighting, and a headphone jack for real-time monitoring make it great for gaming, streaming, and recording. Includes a noise-canceling windscreen." },
  { id: 10, name: "SUPERDANNY Power Strip Surge Protector with 22 AC Outlets and 6 USB Ports, 1875W/15A", cost: 69.99, category: "Power Strip", stock: 189,
    description: "A 28-in-1 power strip certified by FCC, RoHS, and UL with 22 grounded outlets and 6 USB ports including USB-C. Widely spaced outlets prevent clutter, and the mountable flat plug plus heavy-duty cord deliver reliable, protected power backed by a 1,000-day warranty." },
  { id: 11, name: "Sony PlayStation 5 Slim Console - White", cost: 499.99, category: "PlayStation", stock: 17,
    description: "A sleek, compact console with a 1TB ultra-high-speed SSD, ray tracing, 4K gaming, and up to 120fps with HDR. The DualSense controller adds haptic feedback and adaptive triggers, with Tempest 3D AudioTech and backward compatibility for thousands of PS4 games." },
  { id: 12, name: "ASUS ROG Ally 7\" 120Hz FHD Gaming Handheld - AMD Ryzen Z1 - 512GB - White", cost: 499.99, category: "Handheld", stock: 57,
    description: "A 7-inch 120Hz FHD gaming handheld with an AMD Ryzen Z1 processor and 512GB storage for seamless play across Steam, Xbox Game Pass, and more. Runs Windows 11 on a 1080p AMD FreeSync touchscreen with robust cooling for powerful portable gaming." },
  { id: 13, name: "Apple AirPods Max - Space Gray", cost: 549.99, category: "Headphones", stock: 75,
    description: "Premium over-ear headphones with high-fidelity audio, effective noise cancellation, and seamless Apple device integration. Spatial audio, a comfortable fit, and up to 20 hours of battery life make them a compelling flagship choice." },
  { id: 14, name: "Logitech MX Brio Ultra HD 4K Conference, Gaming and Streaming Webcam - Black", cost: 199.99, category: "Webcam", stock: 132,
    description: "An 8.5MP sensor with AI-enhanced image quality and dual noise-reducing microphones for crisp 4K video conferencing and streaming. Compatible with multiple platforms, customizable via Logi Options+, with a built-in privacy cover and flexible mounting." },
  { id: 15, name: "Elgato Stream Deck MK.2 USB Keypad with 15 Customizable LCD Keys - Black", cost: 129.99, category: "Stream Deck", stock: 327,
    description: "Fifteen customizable LCD keys give seamless control of apps, tools, and platforms. Streamline tasks, launch programs, and enhance your content-creation workflow with an interchangeable faceplate." },
  { id: 16, name: "Logitech PRO X SUPERLIGHT Lightweight Wireless Gaming Mouse with HERO 25K Sensor - White", cost: 159.99, category: "Mouse", stock: 7,
    description: "One of the lightest and fastest PRO gaming mice, designed with top esports pros. LIGHTSPEED wireless and the HERO 25K sensor deliver precise control with zero-additive PTFE feet and a pro-grade 1ms report rate in an ultra-lightweight, carbon-neutral design." },
  { id: 17, name: "Razer BlackWidow V4 Full Size Wired Mechanical Green Switch Gaming Keyboard with Chroma RGB - Black", cost: 169.99, category: "Keyboard", stock: 0,
    description: "A highly evolved mechanical keyboard with Razer Chroma RGB for full immersion. Razer Green mechanical switches give precise, tactile feedback, six dedicated macro keys are fully programmable, and a magnetic plush leatherette wrist rest keeps you comfortable. A multi-function roller and four media keys handle playback." }
]

puts "Creating items..."
items.each do |attrs|
  item = Item.create!(attrs)
  begin
    item.photo.attach(
      io: URI.open("https://picsum.photos/seed/amazeon#{item.id}/600/600"),
      filename: "item-#{item.id}.jpg",
      content_type: "image/jpeg"
    )
  rescue StandardError => e
    puts "  Skipped image for item #{item.id}: #{e.class} #{e.message}"
  end
end

puts "Done!"
