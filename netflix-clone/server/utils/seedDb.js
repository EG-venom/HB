require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Content = require('../models/Content');
const Category = require('../models/Category');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample Categories/Genres
const categories = [
  {
    name: 'Action',
    description: 'Action-packed movies and shows'
  },
  {
    name: 'Comedy',
    description: 'Funny movies and shows'
  },
  {
    name: 'Drama',
    description: 'Dramatic movies and shows'
  },
  {
    name: 'Sci-Fi',
    description: 'Science fiction movies and shows'
  },
  {
    name: 'Horror',
    description: 'Scary movies and shows'
  },
  {
    name: 'Romance',
    description: 'Romantic movies and shows'
  },
  {
    name: 'Documentary',
    description: 'Documentary movies and shows'
  },
  {
    name: 'Thriller',
    description: 'Suspenseful movies and shows'
  }
];

// Sample Admin User
const adminUser = {
  name: 'Admin User',
  email: 'admin@netflix.com',
  password: 'password123',
  role: 'admin'
};

// Import data
const importData = async () => {
  try {
    // Clear DB
    await User.deleteMany();
    await Content.deleteMany();
    await Category.deleteMany();

    console.log('Data cleared...');

    // Create categories
    const createdCategories = await Category.create(categories);
    console.log(`${createdCategories.length} categories created`);

    // Map category ids by name for easy reference
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Create some content
    const contents = [
      {
        title: 'Stranger Things',
        description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
        type: 'tv',
        genres: [categoryMap['Sci-Fi'], categoryMap['Drama'], categoryMap['Horror']],
        releaseYear: 2016,
        maturityRating: 'TV-14',
        duration: '4 Seasons',
        poster: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABfNrKvs5Q7Xccp6ZBLJOeBs-XA9xnBwpELFHvtgBCw8yiwCIzExr7mU4yUiRAuSE6os15IRwzrRB2EHGKjD0VPNA1BYx9R7bIhI.jpg?r=dec',
        backdrop: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABfcCR2aFVdDC3nuRRZ3dP3YUwbnC-GPXbVxI4OVcCKTmnF-qhIpLACvRVYL6iEYJ73wJ3Kq7li-Z9NZoQNQppQJKYOAsWE6PN7a3.jpg?r=c68',
        logo: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABWy-c_WNVepXdYQxFSNbGBXN-Yi9Aqd6ULNtg67TJ-jvbAo7jIgRnLQsO5mNCaUmrv6N2hvwwVe2Cv87bE6d6CXZrWOLswLcNUdpA5RkKLRoZ-c8ROmKLDlMYdyDK7qoSCUdETrSb5zOiZi3CKuT4tXPoxRdIGCkzh_uZVLq0vz2NxOmhj2N.png?r=6c2',
        trailerUrl: 'https://www.youtube.com/watch?v=b9EkMc79ZSU',
        creator: 'The Duffer Brothers',
        isOriginal: true,
        isTrending: true,
        rank: 1,
        seasons: [
          {
            number: 1,
            episodes: [
              {
                number: 1,
                title: 'Chapter One: The Vanishing of Will Byers',
                description: 'On his way home from a friend\'s house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.',
                duration: '47m',
                thumbnail: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABVeecIkUmbgacJMr3s7I9fZYFRnsZJFPgK69DLenEXv7FbvM0YFCQrcLXnPRlKcwQyEzPm_r7nNXJZd-xFoolQtw59GpLKFC0H0IPEnl3VlV-I5VGH7TUNZb.jpg?r=5e9',
                videoUrl: ''
              }
            ]
          }
        ]
      },
      {
        title: 'Black Mirror',
        description: 'This sci-fi anthology series explores a twisted, high-tech near-future where humanity\'s greatest innovations and darkest instincts collide.',
        type: 'tv',
        genres: [categoryMap['Sci-Fi'], categoryMap['Drama'], categoryMap['Thriller']],
        releaseYear: 2011,
        maturityRating: 'TV-MA',
        duration: '6 Seasons',
        poster: 'https://ext.same-assets.com/855227852/748199491.webp',
        backdrop: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABdjkxXPiURKzSPYvL9aq7iiNuO6Z6uuTDJ0yEyRqz9aSTYeXuJF7NQhvMGFECBxOZrdG25zPt4YcF5kT-JNow_GFkFVd.jpg?r=6a6',
        logo: '',
        trailerUrl: 'https://www.youtube.com/watch?v=5ELQ6u_5YYM',
        creator: 'Charlie Brooker',
        isOriginal: true,
        isTrending: true,
        rank: 2
      },
      {
        title: 'The Crown',
        description: 'Based on the award-winning play "The Audience," this drama series chronicles the life of Queen Elizabeth II from the 1940s to modern times.',
        type: 'tv',
        genres: [categoryMap['Drama']],
        releaseYear: 2016,
        maturityRating: 'TV-MA',
        duration: '5 Seasons',
        poster: 'https://ext.same-assets.com/855227852/3957651369.webp',
        backdrop: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABQnCKnJ4JoR0yWYPGAUgCLLo7LJQYmEIFUqLJOeZi-CHkOK-FMKBL8A-jOxiXjENkzYFsAe1JA4FsGmk0hL_sPFNbVo7cU233dN6.jpg?r=74a',
        logo: '',
        trailerUrl: 'https://www.youtube.com/watch?v=dGCkxdXYqxk',
        creator: 'Peter Morgan',
        isOriginal: true,
        isTrending: true,
        rank: 3
      },
      {
        title: 'Arcane',
        description: 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.',
        type: 'tv',
        genres: [categoryMap['Sci-Fi'], categoryMap['Action']],
        releaseYear: 2021,
        maturityRating: 'TV-14',
        duration: '1 Season',
        poster: 'https://ext.same-assets.com/855227852/3957651369.webp',
        backdrop: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABWB4vov4H5Xd21u7Q1FUYs3QBz5J5QRXBsVqY7BYvvKxQQcnBH64zG6nJQT36EV8iipUxLLv6UpXiWkFI6tELQf0j0vg_YYajH8B.jpg?r=bcd',
        logo: '',
        trailerUrl: 'https://www.youtube.com/watch?v=fXmAurh012s',
        creator: 'Christian Linke, Alex Yee',
        isOriginal: true,
        isTrending: true,
        rank: 4
      },
      {
        title: 'The Witcher',
        description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
        type: 'tv',
        genres: [categoryMap['Action'], categoryMap['Drama'], categoryMap['Sci-Fi']],
        releaseYear: 2019,
        maturityRating: 'TV-MA',
        duration: '2 Seasons',
        poster: 'https://ext.same-assets.com/855227852/2576979829.webp',
        backdrop: 'https://occ-0-90-92.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABTyqUMPKCNLQ-I1-CJD-1x29wUfRSspCJkPMHnvGLuKGfHybcNLCHc0Lcv8i_T0u3DP_hTr9UDaJmB0G2LDEQgI3Q89jS7qLm3BQ.jpg?r=1d5',
        logo: '',
        trailerUrl: 'https://www.youtube.com/watch?v=ndl1W4ltcmg',
        creator: 'Lauren Schmidt Hissrich',
        isOriginal: true,
        isTrending: true,
        rank: 5
      }
    ];

    await Content.create(contents);
    console.log(`${contents.length} content items created`);

    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');

    console.log('Data imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Content.deleteMany();
    await Category.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run command
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please add proper argument: -i (import) or -d (delete)');
  process.exit();
}
