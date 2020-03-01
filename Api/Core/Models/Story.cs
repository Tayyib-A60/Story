namespace Api.Core.Models
{
    public class Story
    {
        public int StoryId { get; set; }
        public int UserId { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public Complexity TaskComplexity { get; set; }
        public int EstimatedTime { get; set; }
        public double Cost { get; set; }
        public int ReviewerId { get; set; }
        public bool Approved { get; set; }
        public bool ReviewedByAdmin { get; set; }
        public string AdminComment { get; set; }
    }
}