using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SehirRehberi.API.Model;
using SehirRehberi.API.Dtos;

namespace SehirRehberi.API.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityForListDto>()
                .ForMember(dest=> dest.PhotoUrl,opt=> {

                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain == true).Url);

                });

            CreateMap<City, CityForDetailDto>();

            CreateMap<PhotoForCreationDto, Photo>();

            CreateMap<Photo, PhotoForReturnDeto > ();
        }
    }
}
