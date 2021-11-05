import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Linking, TouchableOpacity, Image } from 'react-native';
// import SkeletonContent from 'react-native-skeleton-content';
import {
  Fade,
  Placeholder,
  PlaceholderMedia,
} from "rn-placeholder";

import {
  Container
} from './styles';

interface UsersFollowsProps {
  url: string;
  name: string;
  isLoadingUsersFollows: boolean;
}

export function UsersFollowsCard({ url, name, isLoadingUsersFollows }: UsersFollowsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prefetchImage() {
      try {
        await Image.prefetch(url.replace('{width}x{height}', '450x600'));
        
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Erro imagem Top Games');
      }
    }

    if (!isLoadingUsersFollows)
      prefetchImage();
  }, [isLoadingUsersFollows])

  return (
    // <SkeletonContent
    //   isLoading={isLoading}
    //   boneColor="#1C1C21"
    //   highlightColor="#272730c1"
    //   duration={2000}
    //   layout={[
    //     { key: 'banner', width: 150, height: 200, borderRadius: 10, marginRight: 16 },
    //   ]}
    // >
    isLoading ? (
      <Placeholder
        Animation={Fade}
        style={{
          width: 150,
          height: 200,        
          marginRight: 16,
          opacity: 0.2
        }}
      >
        <PlaceholderMedia
          color="#828282"
          style={{ 
            flex: 1, 
            width: '100%', 
            borderRadius: 10 
          }}
        />
      </Placeholder>
    ) : (
      <TouchableOpacity activeOpacity={0.5} onPress={() => Linking.openURL(`https://www.twitch.tv/directory/game/${encodeURI(name)}`)}>
        <Container 
          source={{ uri: url && url.replace('{width}x{height}', '450x600') }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    )
    // </SkeletonContent>
  );
}