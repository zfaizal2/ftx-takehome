export default async function handler(req,res) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',

    };
    var data;
    const {pageNum} = req.query;
    var searchParams = new URLSearchParams()
    var startInclusive, endExclusive;
    if (pageNum > 0) {
        startInclusive = 12 * pageNum;
        endExclusive = (12 * pageNum) + 12;
    } else {
        startInclusive = 0
        endExclusive = 12
    }


    searchParams.set("startInclusive", startInclusive)
    searchParams.set("endExclusive", endExclusive)
    searchParams.set("collectionType", 'all')

    await fetch("https://ftx.us/api/nft/collections_page?" + searchParams, requestOptions)
      .then(response => response.json())
      .then(result => {
        data = result;
        }
    )
      .catch(error => console.log('error', error));
    res.status(200).json(data)

}

