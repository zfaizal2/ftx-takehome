import React, {useState, useEffect} from "react"
import { useRouter } from "next/router"
import styles from "../styles/collection.module.css"
import { Grid, GridItem } from "@chakra-ui/react"
import NFT from "../components/nft"
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export default function Collection() {
    const router = useRouter()
    const [collectionData, setCollectionData] = useState();
    const [nftData, setNftData] = useState();
    const [responseData, setResponseData]  = useState();
    const [pageNum, setPageNum] = useState(1);



    useEffect(() => {
        getCollectionData();
    }, [])


    useEffect(() => {
        if (router.query.collectionName) {
            setNftData()
        }
    }, [router.query])

    useEffect(() => {
        if (responseData) {
            setCollectionData(responseData)
        }
    }, [responseData])

    function handleClick(id) {
        router.push({
          pathname:'/collection',
          query: {nftID:id}
        }, undefined, { shallow: true})
    }


    async function getCollectionData(num) {
        var collectionString = JSON.stringify({collection:router.query.collectionName})
        var searchParams = new URLSearchParams();
        searchParams.set("pageNum", num)
        searchParams.set("nft_filter_string", collectionString)

      await fetch("/api/collectionData?" + searchParams)
        .then(response => response.json())
        .then(data => 
            setResponseData(data)
        )
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    function handlePageClick(num) {
        setPageNum(num)
        setCollectionData()
        getCollectionData(num)
      }
    

    return (
        <>
        {nftData ? 
            <div>
                <NFT nftData={nftData}/>
            </div> :
            <div className={styles.container}>
                <div className={styles.title}>
                    {router.query.collectionName}
                </div>

                {collectionData ?
                    <>
                        <Grid w='100%' h='100%' templateColumns='repeat(4, 1fr)' gap={6}> 
                        {collectionData.result.nfts.map((nftData) =>
                            <GridItem onClick={() => {setNftData(nftData); handleClick(nftData.id)}} className={styles.card} key={nftData.id} w="100%" h="10remrem" bg="blue.500">
                                <img width={150} height={150} src={nftData.imageUrl}/>
                                <div className={styles.cardTitle}>
                                {nftData.name}
                                </div>
                                <div className={styles.cardTitle}>
                                {nftData.offerPrice} {nftData.quoteCurrency}
                                </div>
                            </GridItem>
                        )}
                        </Grid>
                        <div className={styles.pageNav}>
                            {pageNum > 1 &&
                                <ArrowBackIcon m={2} onClick={() => handlePageClick(pageNum - 1)}/>
                            }
                            {(pageNum * 12) <= collectionData.result.total &&
                                <ArrowForwardIcon m={2} onClick={() => handlePageClick(pageNum + 1)}/>
                            }
                        </div>
                    </> :
                    <div>
                        loading...
                    </div>
                }
            </div>
        }
        </>
    )
}