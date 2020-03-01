using Api.Controllers.DTOs;
using Api.Core.Models;
using AutoMapper;

namespace Api.Mapping {
    public class MappingProfile : Profile {
        public MappingProfile () {
            // Domain to API Resource
            CreateMap<Story, StoryDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<User, UserToReturn>();

            
            CreateMap<UserDTO, User>();
            CreateMap<StoryDTO, Story>();

        }
    }
}