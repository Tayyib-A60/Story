using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Api.Core.Models;
using AutoMapper;
using Api.Core;
using Api.Extensions;
using Api.Controllers.DTOs;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System;

namespace Api.Controllers
{
    [Authorize]
    [Route("/api/story")]
    [ApiController]
    public class StoryController : Controller
    {
        private IMapper _mapper { get; }
        private IUserRepository _userRepository { get; }
        private AppSettings _appSettings { get; }
        private IStoryRepository _storyRepository { get; }
        public StoryController(IMapper mapper, IUserRepository userRepository, IOptions<AppSettings> appSettings, IStoryRepository story)
        {
            _storyRepository = story;
            _appSettings = appSettings.Value;
            _userRepository = userRepository;
            _mapper = mapper;

        }


        [HttpPost("createStory")]
        public async Task<IActionResult> CreateStory([FromBody] StoryDTO storyDTO)
        {
            if ((storyDTO.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) || (User.FindFirst(ClaimTypes.Role).Value != Role.User.ToString())) {
                return Unauthorized();
            }
            if(await _userRepository.GetUser(storyDTO.ReviewerId) == null) {
                return BadRequest("Reviewer not found");
            } 
            var story = _mapper.Map<Story>(storyDTO);
            story.ReviewedByAdmin = false;
            story.Approved = false;
            story.AdminComment = null;
            _storyRepository.Add(story);
            await _storyRepository.SaveAllChanges();
            return Ok();
        }

        [HttpPost("reviewStory/{userId}")]
        public async Task<IActionResult> ReviewStory(int userId, [FromBody] StoryDTO storyDTO)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) || User.FindFirst(ClaimTypes.Role).Value != Role.Admin.ToString()) {
                return Unauthorized();
            }
            var story = _mapper.Map<Story>(storyDTO);
            story.ReviewedByAdmin = true;

            _storyRepository.Update(story);
            await _storyRepository.SaveAllChanges();
            return Ok(story);
        }

        [HttpGet("getStory/{userId}/{storyId}")]
        public async Task<IActionResult> GetStory(int userId, int storyId)
        {
            if ((userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))) {
                return Unauthorized();
            }

            bool isAdmin = false;

            if(User.FindFirst(ClaimTypes.Role).Value == Role.Admin.ToString()) {
                isAdmin = true;
            }

            var story = await _storyRepository.GetStory(isAdmin, userId, storyId);
            if(story == null) return NotFound("Story not found");
            return Ok(story);
        }
        
        [HttpGet("getStories/{userId}")]
        public async Task<IActionResult> GetStories(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) {
                return Unauthorized();
            }

            bool isAdmin = false;

            if(User.FindFirst(ClaimTypes.Role).Value == Role.Admin.ToString()) {
                isAdmin = true;
            }
        
            var stories = await _storyRepository.GetStories(isAdmin, userId);
            return Ok(stories);
        }
    }
}
