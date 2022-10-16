import ARDetailContents from "@components/AlcoholRecipe/ARDetailContents";
import ARReview from "@components/AlcoholRecipe/ARReview";
import ARReviewInput from "@components/AlcoholRecipe/ARReviewInput";
import styles from '@styles/AlcoholRecipe/AlcoholDetail.module.scss';
import layoutStyles from '@layouts/Layout.module.scss';
import { getAlcRecipeDetail } from "@api/alcRecipe";
import { AlcRecipeDetail, AlcRecipeDetailReviews } from "api/model/alcRecipe";
import { GetServerSideProps, NextPage } from "next";

interface AlcoholRecipeDetailPageProps {
    Data: AlcRecipeDetail;
}


const AlcoholRecipeDetailPage: NextPage<AlcoholRecipeDetailPageProps> = (props) => {
    const { Data } = props;
  
    return(
      <div className={layoutStyles.arMd}>
        <h1>디테일 페이지</h1>
        <ARDetailContents {...Data}/>
        <ARReviewInput/>
        <div className={styles.reviewBox}>
          {Data.reviews?.map((reviewData : AlcRecipeDetailReviews) =>(
          <ARReview key={reviewData.id}{...reviewData}></ARReview>
          ))}
        </div>
      </div>
    )
}

export default AlcoholRecipeDetailPage;

export const getServerSideProps: GetServerSideProps = async (context)=> {
    const { data } = await getAlcRecipeDetail(context.query.id as string);
    return {
      props: {
        Data: data.data,
      }
    };
  };