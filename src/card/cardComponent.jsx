import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

/////////////////////////////////////////////////////////////////
// スタイル。各種記事ブロックに収める画像とリンクをカードクラスで生成する。
// 詳細なプロパティはindex.cssに記述。
/////////////////////////////////////////////////////////////////
const ArticleCardStyle = makeStyles({
    root:{
    },
    media: {
        height:200,
    },
});

///////////////////////////////////////////////////////////////// 
// 各種記事ブロックに収める画像とリンクをカードクラスで生成する。
///////////////////////////////////////////////////////////////// 
export const MediaCardForContentsBlock = (props) => {
    const {Content} = props;
    const classes = ArticleCardStyle();

    return(
      <div className="article"> 
        <Card className={classes.root}>
          <CardActionArea>
            <a href={Content.source} style={{textDecoration: "none"}} target="_blank" rel="noreferrer">
              <CardMedia className={classes.media} image={Content.image} title={Content.title}>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="h2">{Content.name}</Typography>
                  <Typography variant="subtitle1" color="textPrimary" component="h2">{Content.title}</Typography>
                </CardContent>
              </CardMedia>
            </a>
          </CardActionArea>
        </Card>
      </div>
    );

}

///////////////////////////////////////////////////////////////// 
// ヘッダーブロックに収める履歴リスト。画像とリンクをカードクラスで生成する。
// 2021/12/08 廃止
///////////////////////////////////////////////////////////////// 
export const MediaCardForCacheList = (props) => {
    const {Cache} = props;
  
    return(
        <div className="CacheList"> 
            <Card >
                <CardActionArea>
                    <a href={Cache.source} target="_blank" rel="noreferrer">
                        <CardMedia component="img" image={Cache.image} title={Cache.title}/>
                    </a>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default MediaCardForContentsBlock;