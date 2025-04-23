// Sample news data
export const newsData = [
  {
    id: 1,
    title: "The Future of Renewable Energy: Breakthroughs and Challenges",
    category: "Technology",
    image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg",
    summary: "Recent innovations in renewable energy technology are changing how we think about power generation and sustainability.",
    content: `
      <p>The renewable energy sector has seen remarkable growth and innovation in recent years, driven by the urgent need to address climate change and reduce dependency on fossil fuels. Solar and wind power have led this revolution, with costs dropping dramatically over the past decade.</p>
      
      <p>Solar panel efficiency has improved significantly, with new materials and designs allowing for better energy capture even in less-than-ideal conditions. Similarly, wind turbines have grown larger and more efficient, capable of generating substantial power even at lower wind speeds.</p>
      
      <p>Beyond these established technologies, emerging solutions like green hydrogen, advanced battery storage, and next-generation nuclear reactors are beginning to play important roles in the energy transition.</p>
      
      <p>However, challenges remain. The intermittent nature of renewable sources requires robust energy storage solutions, and upgrading aging grid infrastructure is essential for managing distributed energy generation. Additionally, ensuring equitable access to clean energy technology across different socioeconomic groups and regions remains a priority.</p>
      
      <p>Despite these hurdles, the trajectory is clear: renewable energy is rapidly becoming not just an environmental choice but an economic one as well. As technology continues to advance and costs decrease further, we can expect to see an acceleration in the global shift toward cleaner energy sources.</p>
    `,
    publishDate: "2023-05-15",
    views: 1250,
    likes: 342,
    dislikes: 12,
    comments: [
      { id: 1, user: "EnergyExpert", text: "Great article! I'd add that energy storage technologies are advancing faster than many predicted.", date: "2023-05-15" },
      { id: 2, user: "GreenFuture", text: "We need more government investment in these technologies to speed up adoption.", date: "2023-05-16" }
    ]
  },
  {
    id: 2,
    title: "Artificial Intelligence in Healthcare: Transforming Patient Care",
    category: "Health",
    image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg",
    summary: "AI technologies are revolutionizing healthcare delivery, from diagnosis to treatment planning and patient monitoring.",
    content: `
      <p>Artificial intelligence is dramatically changing healthcare, offering new ways to improve patient outcomes while potentially reducing costs. Machine learning algorithms are now capable of analyzing medical images with accuracy rivaling that of experienced radiologists, helping to detect conditions like cancer at earlier, more treatable stages.</p>
      
      <p>In hospitals, AI systems are helping to triage patients, predict deterioration before it becomes critical, and optimize resource allocation. Pharmaceutical companies are using machine learning to accelerate drug discovery, analyzing vast datasets to identify promising compounds much faster than traditional methods allow.</p>
      
      <p>For patients, AI-powered tools are enabling more personalized care and improved access. Virtual health assistants can provide basic health information and reminders, while more sophisticated systems can monitor chronic conditions through connected devices, alerting healthcare providers when intervention might be needed.</p>
      
      <p>However, the integration of AI into healthcare raises important questions about data privacy, algorithm bias, and the changing role of healthcare professionals. Ensuring that these technologies are developed and deployed ethically, with appropriate oversight and transparency, remains a critical challenge.</p>
      
      <p>As the field continues to evolve, collaboration between technologists, healthcare providers, ethicists, and regulators will be essential to realizing the full potential of AI in healthcare while mitigating potential risks.</p>
    `,
    publishDate: "2023-06-02",
    views: 980,
    likes: 205,
    dislikes: 8,
    comments: [
      { id: 1, user: "DocTech", text: "I've seen these systems in action, and they're impressive but still need human oversight.", date: "2023-06-03" }
    ]
  },
  {
    id: 3,
    title: "Global Supply Chain Disruptions: Economic Impact and Recovery Strategies",
    category: "Business",
    image: "https://images.pexels.com/photos/4052198/pexels-photo-4052198.jpeg",
    summary: "Ongoing supply chain challenges are forcing businesses to rethink logistics and manufacturing strategies.",
    content: `
      <p>Global supply chains have faced unprecedented disruptions in recent years, from the COVID-19 pandemic to geopolitical tensions and extreme weather events. These challenges have exposed vulnerabilities in the just-in-time delivery models that dominated global trade for decades.</p>
      
      <p>The impacts have been felt across industries and by consumers worldwide, with shortages of everything from semiconductors to household goods. Many manufacturers have experienced production delays, while retailers have struggled with inventory management and unpredictable availability of products.</p>
      
      <p>In response, businesses are developing more resilient supply chain strategies. Some are reshoring or nearshoring production to reduce dependency on distant suppliers. Others are diversifying their supplier networks or building larger inventory buffers for critical components.</p>
      
      <p>Advanced technologies are playing a key role in this transformation. Artificial intelligence and machine learning are improving demand forecasting, while blockchain and IoT devices are enhancing supply chain visibility and traceability.</p>
      
      <p>While these disruptions have caused significant economic pain, they have also catalyzed innovation and a fundamental rethinking of supply chain management. The new models emerging emphasize resilience alongside efficiency, potentially creating more robust systems better equipped to handle future shocks.</p>
    `,
    publishDate: "2023-07-10",
    views: 756,
    likes: 124,
    dislikes: 18,
    comments: [
      { id: 1, user: "SupplyChainPro", text: "Companies need to stop prioritizing cost-cutting over resilience.", date: "2023-07-10" },
      { id: 2, user: "GlobalTrader", text: "Interesting perspective. I think regional trade hubs will become more important.", date: "2023-07-11" },
      { id: 3, user: "EconAnalyst", text: "The transition will be expensive but necessary for long-term stability.", date: "2023-07-12" }
    ]
  },
  {
    id: 4,
    title: "Urban Farming: Growing Food in City Spaces",
    category: "Environment",
    image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg",
    summary: "Innovative urban agriculture projects are changing how cities approach food security and sustainability.",
    content: `
      <p>Urban farming is gaining momentum worldwide as cities look to enhance food security, reduce carbon footprints associated with food transportation, and create green spaces in urban environments. From rooftop gardens to vertical farms utilizing hydroponics and LED lighting, urban agriculture is taking many innovative forms.</p>
      
      <p>These initiatives are proving that significant amounts of fresh produce can be grown within city limits. Some vertical farming operations report yields up to 350 times greater per square foot than conventional farming, while using up to 95% less water.</p>
      
      <p>Beyond production efficiency, urban farms offer numerous social and environmental benefits. They can provide educational opportunities, create jobs, strengthen community bonds, reduce urban heat island effects, and improve air quality.</p>
      
      <p>Cities like Singapore, Paris, and Detroit are particularly embracing urban agriculture, incorporating it into their sustainability and resilience planning. Policies supporting these initiatives include zoning adjustments, tax incentives, and grants for startup costs.</p>
      
      <p>While urban farming alone cannot entirely replace traditional agriculture, it represents an important complement to existing food systems. As technology continues to improve and successful models are replicated, urban farming is likely to become an increasingly significant component of sustainable cities.</p>
    `,
    publishDate: "2023-08-05",
    views: 542,
    likes: 187,
    dislikes: 5,
    comments: [
      { id: 1, user: "GreenThumb", text: "I started a community garden in my neighborhood and the benefits go far beyond the food produced.", date: "2023-08-06" }
    ]
  },
  {
    id: 5,
    title: "The Psychology of Social Media: Impact on Mental Health and Society",
    category: "Health",
    image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
    summary: "Research reveals complex effects of social media usage on psychological wellbeing and social dynamics.",
    content: `
      <p>Social media has fundamentally changed how we communicate, access information, and experience community. While these platforms offer unprecedented connectivity and opportunities for self-expression, research increasingly points to complex psychological impacts that merit careful consideration.</p>
      
      <p>Studies have associated heavy social media use with increased rates of anxiety, depression, and loneliness in some populations. The mechanisms behind these correlations appear multifaceted, involving factors like social comparison, fear of missing out (FOMO), sleep disruption, and the addictive nature of variable reward systems built into platform designs.</p>
      
      <p>However, research also indicates that how we use social media matters more than how much. Passive consumption of content tends to be associated with more negative outcomes, while active engagement and authentic connection often show more positive effects.</p>
      
      <p>Beyond individual psychology, social media has transformed group dynamics and societal discourse. It has enabled new forms of community and activism, while simultaneously contributing to political polarization and the spread of misinformation.</p>
      
      <p>As awareness of these issues grows, we're seeing responses on multiple fronts. Tech companies are exploring design changes to promote healthier use, educators are developing digital literacy programs, and individuals are increasingly adopting intentional approaches to their digital lives. These efforts reflect a maturing relationship with technology that seeks to maximize benefits while mitigating potential harms.</p>
    `,
    publishDate: "2023-09-12",
    views: 1105,
    likes: 276,
    dislikes: 24,
    comments: [
      { id: 1, user: "DigitalDetoxer", text: "I've started setting time limits for my social media use and it's made a huge difference in my anxiety levels.", date: "2023-09-13" },
      { id: 2, user: "PsychResearcher", text: "Good overview, though I think we need to be careful about drawing causal conclusions from correlational studies.", date: "2023-09-14" }
    ]
  },
  {
    id: 6,
    title: "Ocean Conservation: New Approaches to Protecting Marine Ecosystems",
    category: "Environment",
    image: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg",
    summary: "Innovative conservation strategies are being deployed to address threats to ocean health and biodiversity.",
    content: `
      <p>The world's oceans face multiple threats, from plastic pollution and chemical runoff to overfishing and climate change. In response, conservation efforts are evolving, embracing new technologies and collaborative approaches to protect marine ecosystems.</p>
      
      <p>Remote sensing and underwater drones now allow scientists to monitor ocean conditions and marine life with unprecedented detail and scope. These technologies help identify critical habitats, track population changes, and detect illegal fishing activities.</p>
      
      <p>Marine protected areas (MPAs) have expanded significantly, with many countries committing to protecting 30% of their waters by 2030. Evidence shows that well-managed MPAs can restore fish populations, increase biodiversity, and enhance ecosystem resilience to climate change.</p>
      
      <p>Community-based conservation models are gaining recognition for their effectiveness. By involving local fishing communities in management decisions and conservation activities, these approaches help ensure both ecological sustainability and economic viability for coastal populations.</p>
      
      <p>Novel solutions to specific threats are also emerging. Innovations in biodegradable materials and waste management systems are helping address plastic pollution, while regenerative ocean farming offers sustainable alternatives to conventional aquaculture.</p>
      
      <p>While the challenges facing our oceans remain daunting, these diverse conservation strategies provide reasons for cautious optimism. By combining scientific innovation, policy reform, and community engagement, we are developing more effective tools for ocean stewardship.</p>
    `,
    publishDate: "2023-10-08",
    views: 482,
    likes: 165,
    dislikes: 7,
    comments: []
  }
];

// Function to get trending articles (most viewed)
export const getTrendingArticles = () => {
  return [...newsData].sort((a, b) => b.views - a.views).slice(0, 3);
};

// Function to get articles by category
export const getArticlesByCategory = (category) => {
  if (!category || category === 'All') return newsData;
  return newsData.filter(article => article.category === category);
};

// Get unique categories
export const getCategories = () => {
  const categories = new Set(newsData.map(article => article.category));
  return ['All', ...Array.from(categories)];
};