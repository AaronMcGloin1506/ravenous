const apiKey = "gFxRwb-ds84hWlvPgS2XbBEZmGw-Z95ve_m_zmuqB-zlpyScb8AyMetiJRC0lNhQT3V_S8rMVudFb_dX6J7oxQvi_h4245OBFL8DwOGbcQn21dGwfvMnBf0bd5TCXnYx";

const Yelp = {
    search(term, location, sortBy) {
        //business endpoint of the api
        //fetch will not work correctly due to CORS restrictions
        //bypass the restriction by appending CORS Anywhere to the start of the api
        //CORS Anywhere will take requests sent to its API endpoint, make them for the requesting app with the proper CORS permissions, and then return the response back to the requesting app.
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }));
        }
      });
    }
  };
export default Yelp;



        